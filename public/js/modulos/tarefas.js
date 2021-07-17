import axios from "axios";
import Swal from "sweetalert2";

import { atualizarProgresso } from '../funcoes/avancado';

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

                        atualizarProgresso();
                    }
                })
        }
        if(e.target.classList.contains('fa-trash')) {
            const tarefasHTML = e.target.parentElement.parentElement,
                idTarea = tarefasHTML.dataset.tarefas;

                Swal.fire({
                    title: "Deseja elimina essa tarefa?",
                    text: "Uma tarefa eliminada não se pode recuperar",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim eliminar',
                    cancelButtonText: 'Não cancelar'
                }).then((result) => {
                    if(result.value) {
                        const url = `${location.origin}/tarefas/${idTarea}`;

                        // enviar o delete por meio axios
                        axios.delete(url, { params: { idTarea } })
                            .then(function(resposta) {
                                // Eliminar o novo
                                tarefasHTML.parentElement.removeChild(tarefasHTML);

                                // Opcional um alerta
                                Swal.fire(
                                    'Tarefas Eliminada',
                                    resposta.data,
                                    'success'
                                )

                                atualizarProgresso()
                            })
                    }
                })
        }
    })
}

export default tarefas;