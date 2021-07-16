import axios from "axios";

const tarefas = document.querySelector('.listado-pendientes');

if(tarefas) {
    tarefas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarefas;

            // request há /tarefas/:id
            const url = `${location.origin}/tarefas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(resposta) {
                    if(resposta.status === 200) {
                        icono.classList.toggle('completo');
                    }
                })
            console.log(url);
        }
    })
}

export default tarefas;