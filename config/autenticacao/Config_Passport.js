const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LocalSrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const Usuario = require("../../models/User");
const { InvalidArgumentError } = require("../../models/erros/erros");
const { ExpirationError } = require("../../models/erros/erros");

function verificarUsuario(usuario) {
  if (!usuario) {
    throw new InvalidArgumentError("E-mail Não Cadastrado");
  }
}

async function verificarSenha(senha, senhaHash) {
  const senhaValida = await bcrypt.compare(senha, senhaHash);
  if (!senhaValida) {
    throw new InvalidArgumentError("Senha Inválida");
  }
}

function configurePassport(app) {
  app.use(passport.initialize());

  passport.use(
    new LocalSrategy(
      {
        usernameField: "email",
        passwordField: "senha",
        session: false,
      },
      async (email, senha, done) => {
        try {
          const usuario = await Usuario.findOne({ email: email });
          verificarUsuario(usuario);
          await verificarSenha(senha, usuario.passWordHash);

          done(null, usuario);
        } catch (erro) {
          done(erro);
        }
      }
    )
  );

  passport.use(
    new BearerStrategy(async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);
        const usuario = await Usuario.findOne({ _id: payload.id });
        //verificaExpiracaoToken(payload.tempoExpiracao)
        done(null, usuario);
      } catch (erro) {
        done(erro);
      }
    })
  );
}

module.exports = configurePassport;
