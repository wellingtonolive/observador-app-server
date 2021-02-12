const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

class UsuarioController {

    static async buscarTodos(req, res) {
        let resultados = {}
        try {
            resultados = await User.find()
            return res.status(200).json(resultados)
        }
        catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async signup(req, res, next) {
        let erros = {}
        const { name, email, password } = req.body


        UsuarioController.validar(erros, { name, email, password })

        if (Object.keys(erros).length) {
            return res.status(400).json({ erros });
        }

        try {
            const salt = await bcrypt.genSalt(10)
            const passWordHash = await bcrypt.hash(password, salt)
            const result = await User.create({ name, email, passWordHash })
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

    static validar(erros, campos) {

        if (!campos.name || typeof campos.name !== 'string' || campos.name.length > 50) {
            erros.name = 'Nome de Usuário Obrigatório e deve ter no máximo 50 caracteres.'
        }

        if (!campos.email || typeof campos.email !== "string" || !campos.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
            erros.email = 'E-mail Obrigatório e deve ser válido'
        }

        if (!campos.password || !campos.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)) {
            erros.password =
                "A senha é obrigatória, deve ter pelo menos 8 caracteres, deve conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
        }

    }


}

module.exports = UsuarioController