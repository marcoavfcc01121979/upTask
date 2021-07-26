const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-session',
    failureFlash: true,
    badRequestMessage: 'Ambos os campos são obrigatorios'
});

// Função para revisar o usuario logado
exports.usuarioAutenticado = (req, res, next) => {
    // se o usuario esta autenticado
    if(req.isAuthenticated()) {
        return next();
    }

    // se esta autenticado, redirigir o formulario
    return res.redirect('/iniciar-session');
}

// funcão para encerrar session
exports.encerrarSession = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-session'); // al encerrar session nos leva ao login
    })
}

// gera um token se o usuario é valido
exports.enviarToken = async (req, res) => {
    // Verificar se um usuario existe
    const { email } = req.body
    const usuario = await Usuarios.findOne({
        where: { email }
    });
    
    // se existe o usuario
    if(!usuario) {
        req.flash('error', 'Não existe essa conta');
        res.redirect('/restabelecer');
    }

    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');

    // expiracion
    usuario.expiracao = Date.now() + 3600000;

    // guardalos na base de dados
    await usuario.save();

    // url de reset
    const resetUrl = `http://${req.headers.host}/restabelecer/${usuario.token}`;
    console.log(resetUrl);
}

exports.resetPassword = async (req, res) => {
    // const token = res.json(req.params);
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    })
    // res.json(req.params.token);
    //console.log("tem alguma coisa ", token);
    console.log(" mais ", usuario);
}