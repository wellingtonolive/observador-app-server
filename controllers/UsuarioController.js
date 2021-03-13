const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Validacoes = require("../models/Validacoes");
const jwt = require("jsonwebtoken");
const { EmailVerificacao } = require("../config/email");
const Championship = require("../models/Campeonato");

function gerarToken(usuario) {
  const tempoEmMiliSegundos = 86400000;
  const payLoad = {
    id: usuario.id,
  };

  const token = jwt.sign(payLoad, process.env.TOKEN_SIGN_SECRET, {
    //expiresIn: "6h",
  });
  return token;
}

module.exports = {
  async buscarTodos(req, res) {
    let resultados = {};
    try {
      resultados = await User.find();
      return res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  async detalharUsuario(req, res) {
    const id = req.query.id;
    try {
      const usuario = await User.findOne({ _id: id });
      if (usuario) {
        return res.status(200).json(usuario);
      }
      return res.status(400).json({ msg: "Usuário Não encontrado" });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  },

  async signup(req, res, next) {
    let erros = {};
    const {
      username,
      email,
      name,
      sobrenome,
      genero,
      password,
      nr_celular,
      dt_nascimento,
    } = req.body;

    Validacoes.dadosUsuario(
      {
        username,
        email,
        name,
        sobrenome,
        genero,
        password,
        nr_celular,
        dt_nascimento,
      },
      erros
    );

    if (Object.keys(erros).length) {
      return res.status(400).json({ erros });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const passWordHash = await bcrypt.hash(password, salt);
      const usuario = await User.create({
        username,
        email,
        name,
        sobrenome,
        genero,
        passWordHash,
        nr_celular,
        dt_nascimento,
      });
      const endereco = `localhost:1234/usuario/verificaEmail/` + usuario.id;
      const emailVerificacao = new EmailVerificacao(usuario, endereco);
      emailVerificacao.enviaEmail().catch(console.log);

      return res.status(201).json(usuario);
    } catch (erros) {
      if (erros instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
          error: erros.message,
        });
      } else if (erros.code === 11000) {
        res.status(400).json({
          error: "Nome de Usuário e/ou E-mail já foram usados.",
        });
      }
    }
  },

  async login(req, res) {
    const token = gerarToken(req.user);
    res.set("Authorization", token);
    //res.status(204).send();

    const { name, email, _id } = req.user;
    const userObj = { name, email, _id };

    return res.status(200).json({ user: userObj, token });
  },

  async verifyToken(req, res) {
    const user = req.user._id;
    try {
      const championshipsList = await Championship.find(
        { userID: user },
        {
          _id: 1,
          name: 1,
        }
      );
      return res.status(200).json(championshipsList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
};
