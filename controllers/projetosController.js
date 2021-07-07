exports.projetosHome = (req, res) => {
    res.render('index', {
        nomePagina : 'Projetos'
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nomePagina: 'Novo Projeto'
    })
}

exports.nuevoProyecto = (req, res) => {
    const { nombre } = req.body;
    let errors = [];

    if(!nombre) {
        errors.push({ 'texto': 'Enviar um Nome Projeto' })
    }

    // se há erro
    if(errors.length > 0) {
        res.render('nuevoProyecto', {
            nomePagina: 'Nome Proyecto',
            errors
        })
    } else {
        // Não há erros
        // Insertar em la BD.
    }
}