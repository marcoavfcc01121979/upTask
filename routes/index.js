const express = require('express');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importar controlador
const projetosController = require('../controllers/projetosController')
const tarefasController = require('../controllers/tarefasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController');

module.exports = function() {
    // rota para a home
    router.get('/',
        authController.usuarioAutenticado, 
        projetosController.projetosHome);

    router.get('/nuevo-proyecto',
        authController.usuarioAutenticado, 
        projetosController.formularioProyecto)

    router.post('/nuevo-proyecto',
        authController.usuarioAutenticado, 
        body('nome').not().isEmpty().trim().escape(),
        projetosController.nuevoProyecto);

    // Listando Projetos
    router.get('/projetos/:url',
        authController.usuarioAutenticado, 
        projetosController.projetoPorUrl);

    // Atualizando o projeto
    router.get('/projetos/editar/:id',
        authController.usuarioAutenticado, 
        projetosController.formularioEditar);

    router.post('/nuevo-proyecto/:id',
        authController.usuarioAutenticado, 
        body('nome').not().isEmpty().trim().escape(),
        projetosController.actualizarProyecto);

    // Eliminar Proyecto
    router.delete('/projetos/:url',
        authController.usuarioAutenticado, 
        projetosController.eliminarProjeto);

    // Tarefas
    router.post('/projetos/:url',
        authController.usuarioAutenticado, 
        tarefasController.salvarTarefa);

    // Atualizar tarefas
    router.patch('/tarefas/:id',
        authController.usuarioAutenticado, 
        tarefasController.actualizarEstadoTarefas);

    // Deletar tarefas
    router.delete('/tarefas/:id',
        authController.usuarioAutenticado, 
        tarefasController.eliminarTarefa);

    // Criar nova conta
    router.get('/criar-conta', usuariosController.formCriarConta);
    router.post('/criar-conta', usuariosController.criarConta);

    // Iniciar uma session
    router.get('/iniciar-session', usuariosController.formIniciarSession);
    router.post('/iniciar-session', authController.autenticarUsuario);

    // encerrar sessao
    router.get('/encerrar-session', authController.encerrarSession);
    return router;
}
