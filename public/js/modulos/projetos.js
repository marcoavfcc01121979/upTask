import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    Swal.fire({
        title: "Deseja elimina esse projeto?",
        text: "Um projeto eliminado não se pode recuperar",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim eliminar',
        cancelButtonText: 'Não cancelar'
    }).then((result) => {
        if(result.value) {
            Swal.fire(
                'Projeto eliminado',
                'O Projeto foi eliminado',
                'success'
            );

            // Redirecionar para o inicio
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
        }
    })
})

