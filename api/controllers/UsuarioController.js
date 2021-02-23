const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Validacoes = require('../models/Validacoes')
const jwt = require('jsonwebtoken')

function gerarToken(usuario){
    const tempoEmMiliSegundos = 86400000;
    const payLoad = {
        id: usuario.id,
        expiraem: Date.now() + tempoEmMiliSegundos
    }

    const token = jwt.sign(payLoad, process.env.TOKEN_SIGN_SECRET)
    return token
}

module.exports = {

    async buscarTodos(req, res) {
        let resultados = {}
        try {
            resultados = await User.find()
            return res.status(200).json(resultados)
        }
        catch (error) {
            res.status(500).json(error.message)
        }
    },

    async detalharUsuario(req, res) {
        const id = req.query.id
        try {
            const usuario = await User.findOne({ _id: id })
            if (usuario) {
                return res.status(200).json(usuario)
            }
            return res.status(400).json({ msg: 'Usuário Não encontrado' })
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    },

    async signup(req, res, next) {
        let erros = {}
        const { username, email, name, sobrenome, genero, password, nr_celular, dt_nascimento } = req.body

        Validacoes.dadosUsuario({ username, email, name, sobrenome, genero, password, nr_celular, dt_nascimento }, erros)

        if (Object.keys(erros).length) {
            return res.status(400).json({ erros });
        }

        try {
            const salt = await bcrypt.genSalt(10)
            const passWordHash = await bcrypt.hash(password, salt)
            const result = await User.create({ username, email, name, sobrenome, genero, passWordHash, nr_celular, dt_nascimento })
            return res.status(201).json(result)
        }
        catch (erros) {
            if (erros instanceof mongoose.Error.ValidationError) {
                res.status(400).json({
                    error: erros.message
                })
            }
            else if (erros.code === 11000) {
                res.status(400).json(
                    {
                        error: 'Nome de Usuário e/ou E-mail já foram usados.'
                    }
                )
            }
        }
    },

    login(req, res){
        const token = gerarToken(req.user)
        res.set('Authorization', token)
        res.status(204).send();
    }

}

