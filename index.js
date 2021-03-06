const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('dotenv').config({ path: 'variables.env' })

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

// Onde carregar os arquivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Habilitar bodyParser para ler dados do formulario
app.use(bodyParser.urlencoded({ extended: true }))

// Agregamos o express validator a toda a aplicação
app.use(expressValidator());

// Adicionar a página na view
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

// sessao nos permite navegar entre distintas paginas se reolvermos nos autenticar.
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// Passar var dump para aplicação
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    // console.log(res.locals.usuario.id);
    next();
})

app.use('/', routes())

// Servidor y Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('O Servidor esta funcionando');
})
// chama a configuração de email
// require('./handlers/email');