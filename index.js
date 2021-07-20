const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');

// helpers com alguns funções
const helpers = require('./helpers');

// Criar a conexao a la BD
const db = require('./config/db');

// Importar o modelo
require('./models/Projetos');
require('./models/Tarefas');
require('./models/Usuarios');

db.sync()
    .then(() => console.log('Conectado ao Servidor'))
    .catch(error => console.log(error))

// criar um app de express
const app = express();

// Habilitar bodyParser para ler dados do formulario
app.use(bodyParser.urlencoded({ extended: true }))

// Agregamos o express validator a toda a aplicação
// app.use(expressValidator());

// Onde carregar os arquivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Adicionar a página na view
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

// Passar var dump para aplicação
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

app.use('/', routes())

app.listen(3000);