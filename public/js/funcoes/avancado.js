import Swal from "sweetalert2";

export const atualizarProgresso = () => {
    // Selecionar as tarefas existentes
    const tarefas = document.querySelectorAll('li.tarefas');

    if(tarefas.length) {
        // Selecionar as tarefas completadas
        const tarefasCompletas = document.querySelectorAll('i.completo');

        // Calcular avanço
        const avance = Math.round((tarefasCompletas.length / tarefas.length) * 100);

        // mostrar os avancos/
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        if(avance === 100) {
            Swal.fire(
                'Finalizada as tarefas do projeto',
                'Felicidade, terminado suas tarefas',
                'success'
            )
        }
    }
}