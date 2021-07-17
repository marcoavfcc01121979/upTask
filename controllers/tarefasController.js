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


exports.actualizarEstadoTarefas = async (req, res) => {
    const { id } = req.params;
    const tarefas = await Tarefas.findOne({ where: { id } });

    // Atualizar estado
    let estado = 0;
    if(tarefas.estado === estado) {
        estado = 1;
    }
    tarefas.estado = estado;

    const resultado = await tarefas.save();
    if(!resultado) return next();

    //console.log(tarefas);
    res.status(200).send('Atualizado...');
}

exports.eliminarTarefa = async (req, res, next) => {
    const { id } = req.params;

    // Elimina uma tarefa
    const resultado = await Tarefas.destroy({ where: { id } });
    if(!resultado) return next();
    res.status(200).send('Tarefa eliminada corretamente.')
}