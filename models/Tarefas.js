const Sequelize = require('sequelize');
const db = require('../config/db');
const Projetos = require('./Projetos');

const Tarefas = db.define('tarefas', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    tarefas: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});

Tarefas.belongsTo(Projetos);

module.exports = Tarefas;