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
        async (email, passport, done) => {
            try {
                const usuario = await Usuarios.find({
                    where: { email: email }
                });
                // O susuario existe e o password incorreto
                if(!usuario.verificarPassword(password)) {
                    
                }
            } catch (error) {
                // Esse usuario não existe
                return done(null, false, {
                    message: 'Essa conta não existe'
                })
            }
        }
    )
)