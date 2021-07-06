const express = require('express');
const router = express.Router();

// importar controlador
const projetosController = require('../controllers/projetosController')

module.exports = function() {
    // rota para a home
    router.get('/', projetosController.projetosHome);
    
    return router;
}
