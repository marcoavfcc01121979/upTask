const Usuarios = require('../models/Usuarios');

exports.formCriarConta = (req, res) => {
    res.render('criarConta', {
        nomePagina: 'Criar conta em Uptask'
    })
}

exports.formIniciarSession = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSession', {
        nomePagina: 'Iniciar Session em Uptask',
        error: error
    })
}

exports.criarConta = async (req, res) => {
    // ler os dados
    const { email, password } = req.body;

    try {
        // criar os Usuarios
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-session')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('criarConta', {
            mensajes: req.flash(),
            nomePagina: 'Criar conta em Uptask',
            email,
            password,
        })
    }
}