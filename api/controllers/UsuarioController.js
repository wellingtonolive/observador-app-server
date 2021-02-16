const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Validacoes = require('../models/Validacoes')

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
            const result = await User.create({ username, email, name, sobrenome, genero, passWordHash, nr_celular, dt_nascimento})
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
    }

}

