const Projetos = require('../models/Projetos');
const Tarefas = require('../models/Tarefas');

exports.salvarTarefa = async (req, res, next) => {
    const projeto = await Projetos.findOne({
        where: { url: req.params.url }
    });


    // le o valor do input
    const { tarefas } = req.body;

    // estado 0 = incompleto y ID do projeto
    const estado = 0;
    const projetoId = projeto.id;

    // Inserir na base de dados
    const resultados = await Tarefas.create({ tarefas, estado, projetoId });

    if(!resultados) {
        return next();
    }

    // redirecionar
    res.redirect(`/projetos/${req.params.url }`)
}