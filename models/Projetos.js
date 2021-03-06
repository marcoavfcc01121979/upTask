const Sequelize = require('sequelize');
const slug = require('slug');
const db = require('../config/db');
const shortid = require('shortid');

const Projetos = db.define('projetos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome : Sequelize.STRING(100), 
    url : Sequelize.STRING(100) 
}, {
    hooks: {
        beforeCreate(projeto) {
            const url = slug(projeto.nome).toLowerCase();

            projeto.url = `${url}-${shortid.generate()}`;
        }
    }   
});

module.exports = Projetos;