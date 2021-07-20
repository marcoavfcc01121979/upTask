const Usuarios = require('../models/Usuarios');

exports.formCriarConta = (req, res) => {
    res.render('criarConta', {
        nomePagina: 'Criar conta em Uptask'
    })
}

exports.criarConta = (req, res) => {
    // ler os dados
    const { email, password } = req.body;

    // criar os Usuarios
    Usuarios.create({
        email,
        password
    })
    .then(() => {
        res.redirect('/iniciar-session')
    })
}