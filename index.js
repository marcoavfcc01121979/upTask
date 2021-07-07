const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')

// criar um app de express
const app = express();

// Onde carregar os arquivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Adicionar a página na view
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para ler dados do formulario
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes())

app.listen(3000);