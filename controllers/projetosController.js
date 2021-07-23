const Proyectos = require('../models/Projetos');
const Tareas = require('../models/Tarefas');

exports.projetosHome = async (req, res) => {
    // console.log(res.locals.usuario);
    const usuarioId = res.locals.usuario.id;

    const projetos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('index', {
        nomePagina : 'Projetos',
        projetos
    });
}

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;

    const projetos = await Proyectos.findAll({ where: { usuarioId } });

    res.render('nuevoProyecto', {
        nomePagina: 'Novo Projeto',
        projetos
    })
}

exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;

    const projetos = await Proyectos.findAll({ where: { usuarioId } });
    
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
        const usuarioId = res.locals.usuario.id;
        const teste = await Proyectos.create({ nome, usuarioId })
            res.redirect('/');
    }
}

exports.projetoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id;

    const projetos = await Proyectos.findAll({ where: { usuarioId } });
    const projeto = await Proyectos.findOne({
        where: {
            url: req.params.url,
            usuarioId
        }
    });

    // Consultar tarefas do projeto atual
    const tareas = await Tareas.findAll({
        where: {
            projetoId : projeto.id
        }
    })

    if(!projeto) return next();

    // renderizar a vista
    res.render('tarefas', {
        nomePagina: 'Tarefas do Projeto',
        projeto,
        projetos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const usuarioId = res.locals.usuario.id;

    const projetosPromise = Proyectos.findAll({ where: { usuarioId } });
    const projetoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    })

    const [projetos, projeto] = await Promise.all([ projetosPromise, projetoPromise ]);

    // render a la vista
    res.render('nuevoProyecto', {
        nomePagina : 'Editar Projeto',
        projetos,
        projeto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;

    const projetos = await Proyectos.findAll({ where: { usuarioId } });
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
        await Proyectos.update(
            { nome: nome },
            { where: { id: req.params.id } }
        );
            res.redirect('/');
    }
}

exports.eliminarProjeto = async (req, res, next) => {
    // console.log(req);
    const { urlProjeto } = req.query;

    const resultado = await Proyectos.destroy({
        where: { url : urlProjeto }
    });

    if(!resultado) {
        return next();
    }

    res.status(200).send('Projeto eliminado corretamente.')
}