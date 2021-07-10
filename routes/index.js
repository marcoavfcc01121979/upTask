const express = require('express');
const router = express.Router();

// importar express validator
const { body } = require('express-validator/check');

// importar controlador
const projetosController = require('../controllers/projetosController')

module.exports = function() {
    // rota para a home
    router.get('/', projetosController.projetosHome);
    router.get('/nuevo-proyecto', projetosController.formularioProyecto)
    router.post('/nuevo-proyecto', 
        body('nome').not().isEmpty().trim().escape(),
        projetosController.nuevoProyecto)
    return router;
}
