const Usuarios = require('../models/Usuarios');

exports.formCriarConta = (req, res) => {
    res.render('criarConta', {
        nomePagina: 'Criar conta em Uptask'
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
        res.render('criarConta', {
            error: error.errors,
            nomePagina: 'Criar conta em Uptask'
        })
    }
}