const Proyectos = require('../models/Projetos');

exports.projetosHome = async (req, res) => {
    const projetos = await Proyectos.findAll();

    res.render('index', {
        nomePagina : 'Projetos',
        projetos
    });
}

exports.formularioProyecto = async (req, res) => {
    const projetos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nomePagina: 'Novo Projeto',
        projetos
    })
}

exports.nuevoProyecto = async (req, res) => {
    const projetos = await Proyectos.findAll();
    const { nome } = req.body;
    let errors = [];

    if(!nome) {
        errors.push({ 'texto': 'Enviar um Nome Projeto' })
    }

    // se há erro
    if(errors.length > 0) {
        res.render('nuevoProyecto', {
            nomePagina: 'Nome Proyecto',
            errors,
            projetos
        })
    } else {
        // Não há erros
        // Insertar em la BD.
        const proyecto = await Proyectos.create({ nome })
            res.redirect('/');
    }
}

exports.projetoPorUrl = async (req, res, next) => {
    const projetos = await Proyectos.findAll();
    const projeto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if(!projeto) return next();

    // renderizar a vista
    res.render('tarefas', {
        nomePagina: 'Tarefas do Projeto',
        projeto,
        projetos
    })
}