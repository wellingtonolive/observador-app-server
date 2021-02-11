const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const usuarioController = require('../controllers/UsuarioController')


router.get('/usuarios', usuarioController.buscarTodos);

router.post('/usuarios',usuarioController.signup);


/*
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body

    

    const erros = {}

    if (!name || typeof name !== "string" || name.length > 50) {
        erros.name = 'Nome de Usuário Obrigatório e deve ter no máximo 50 caracteres.'
    }

    if (!email || typeof email !== "string" || !email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        erros.email = 'E-mail Obrigatório e deve ser válido'
    }

    if (!password || !password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)) {
        erros.password =
            "A senha é obrigatória, deve ter pelo menos 8 caracteres, deve conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
    }

    if (Object.keys(erros).length) {
        return res.status(400).json({ erros });
    }

    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds)

        const passWordHash = await bcrypt.hash(password, salt)

        //Salvando Usuário no Banco De Dados
        const result = await User.create({ name, email, passWordHash })

        return res.status(201).json(result)

    }
    catch (er) {
        if (er instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                error: er.message
            })
        }
        else if (er.code === 11000) {
            res.status(400).json(
                {
                    error: 'Nome de Usuário e/ou E-mail já foram usados.'
                }
            )
        }

    }

})
*/
module.exports = router