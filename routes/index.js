const express = require('express');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importar controlador
const projetosController = require('../controllers/projetosController')
const tarefasController = require('../controllers/tarefasController')

module.exports = function() {
    // rota para a home
    router.get('/', projetosController.projetosHome);
    router.get('/nuevo-proyecto', projetosController.formularioProyecto)
    router.post('/nuevo-proyecto', 
        body('nome').not().isEmpty().trim().escape(),
        projetosController.nuevoProyecto);

    // Listando Projetos
    router.get('/projetos/:url', projetosController.projetoPorUrl);

    // Atualizando o projeto
    router.get('/projetos/editar/:id', projetosController.formularioEditar)
    router.post('/nuevo-proyecto/:id', 
        body('nome').not().isEmpty().trim().escape(),
        projetosController.actualizarProyecto);

    // Eliminar Proyecto
    router.delete('/projetos/:url', projetosController.eliminarProjeto);

    // Tarefas
    router.post('/projetos/:url', tarefasController.salvarTarefa);

    // Atualizar tarefas
    router.patch('/tarefas/:id', tarefasController.actualizarEstadoTarefas);
    return router;
}
