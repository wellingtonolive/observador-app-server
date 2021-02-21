const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalSrategy = require('passport-local').Strategy
const Usuario = require('../../models/User')


function verificarUsuario(usuario,done) {
    if (!usuario) {
        return done(null, false, {
            message: "Esse e-mail ainda não foi registrado",
        });
    }
}

async function  verificarSenha(senha, senhaHash, done) {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if (!senhaValida) {
        return done(null, false, {
            message: "Senha Inválida"
        });
    }
}

function configurePassport(app) {

    app.use(passport.initialize());

    passport.use(
        new LocalSrategy({
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        }, async (email, senha, done) => {

            try {
                const usuario = await Usuario.findOne({ email: email })
                verificarUsuario(usuario,done)
                await verificarSenha(senha, usuario.passWordHash, done)

                return done(null, usuario)
            }
            catch (erro) {
                return done(erro)
            }
        })
    )
}

module.exports = configurePassport;