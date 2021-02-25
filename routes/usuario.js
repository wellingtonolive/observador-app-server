const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController')
const passport = require('passport');
//const { session } = require('passport');
const MiddleWaresAutenticacao = require('../config/autenticacao/MiddleWares')

router.get('/usuarios', MiddleWaresAutenticacao.bearer,usuarioController.buscarTodos);
router.post('/usuarios',usuarioController.signup);
router.get('/detalharUsuario', usuarioController.detalharUsuario);
router.post('/usuario/login', MiddleWaresAutenticacao.local, usuarioController.login)

module.exports = router