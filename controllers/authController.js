const passport = require('passport');
const Usuarios = require('../models/Usuarios');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');

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

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    if(!usuario) {
        req.flash('error', 'Não Válido');
        res.redirect('/restabelecer');
    }

    // Formulario para generar el password
    res.render('resetPassword', {
        nomePagina: 'Recuperar Senha'
    })
}

// envia um password novo
exports.atualizarPassword = async (req, res) => {
    // Verifica se o token é valido mais tambem a data de expiração
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracao: {
                [Op.gte]: Date.now()
            }
        }
    });
    // Verificamos se o usuario e valido
    if(!usuario) {
        req.flash('error', 'Não válido');
        res.redirect('/restabelecer')
    } 

    // hashear um novo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;   
    usuario.expiracao = null;

    // guardamos o novo password
    await usuario.save();

    req.flash("correto", 'Teu password foi modificado corretamente');
    res.redirect('/iniciar-session');
}