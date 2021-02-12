const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController')

router.get('/usuarios', usuarioController.buscarTodos);
router.post('/usuarios',usuarioController.signup);

module.exports = router