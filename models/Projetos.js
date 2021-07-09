const Sequelize = require('sequelize');

const db = require('../config/db');

const Projetos = db.define('projetos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome : Sequelize.STRING, 
    url : Sequelize.STRING 
});

module.exports = Projetos;