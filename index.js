const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')

// helpers com alguns funções
const helpers = require('./helpers');

// Criar a conexao a la BD
const db = require('./config/db');

// Importar o modelo
require('./models/Projetos');

db.sync()
    .then(() => console.log('Conectado ao Servidor'))
    .catch(error => console.log(error))

// criar um app de express
const app = express();

// Onde carregar os arquivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Adicionar a página na view
app.set('views', path.join(__dirname, './views'));

// Passar var dump para aplicação
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})


// Habilitar bodyParser para ler dados do formulario
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes())

app.listen(3000);