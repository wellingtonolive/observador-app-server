const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController')
const passport = require('passport')

router.get('/usuarios', usuarioController.buscarTodos);
router.post('/usuarios',usuarioController.signup);
router.get('/detalharUsuario', usuarioController.detalharUsuario);
router.post('/usuario/login', passport.authenticate('local',{session:false}), usuarioController.login)

module.exports = router