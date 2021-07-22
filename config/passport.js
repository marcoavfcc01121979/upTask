const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia ao modelo onde vamos autenticar
const Usuarios = require('../models/Usuarios');

// Local strategy - Login com credenciais proprios (usuario y password)
passport.use(
    new LocalStrategy(
        // por default passport espera um usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email }
                });
                // O susuario existe e o password incorreto
                if(!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password Incorreto'
                    })    
                }
                // O Email existe e o password é correto
                return done(null, usuario);
            } catch (error) {
                // Esse usuario não existe
                return done(null, false, {
                    message: 'Essa conta não existe'
                })
            }
        }
    )
);

// Serialize usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

// deserialize o usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

// exportar
module.exports = passport;