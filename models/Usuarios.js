const Sequelize = require('sequelize');
const db = require('../config/db');

const Projetos = require('../models/Projetos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Coloque um e-mail válido.'
            },
            notEmpty: {
                msg: 'O e-mail não pode ser vazio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ja Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O password não pode ser vazio'
            }
        }
    },
    token: Sequelize.STRING,
    expiracao: Sequelize.DATE,
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

// Metodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Projetos);

module.exports = Usuarios;

