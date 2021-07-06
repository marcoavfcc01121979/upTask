const express = require('express');
const routes = require('./routes');
const path = require('path');

// criar um app de express
const app = express();

// Onde carregar os arquivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Adicionar a página na view
app.set('views', path.join(__dirname, './views'));

app.use('/', routes())

app.listen(3000);