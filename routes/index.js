const express = require('express');
const router = express.Router();

// importar controlador
const projetosController = require('../controllers/projetosController')

module.exports = function() {
    // rota para a home
    router.get('/', projetosController.projetosHome);
    router.get('/nuevo-proyecto', projetosController.formularioProyecto)
    router.post('/nuevo-proyecto', projetosController.nuevoProyecto)
    return router;
}
