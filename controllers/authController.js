const passport = require('passport');

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