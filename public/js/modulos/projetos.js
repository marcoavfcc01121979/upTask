import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProjeto = e.target.dataset.proyectoUrl;

        // console.log(urlProjeto);

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
                // enviar pedidos a axios
                const url = `${location.origin}/projetos/${urlProjeto}`

                axios.delete(url, { params: {urlProjeto} })
                    .then(function(resposta) {
                        console.log(resposta);

                        Swal.fire(
                            'Projeto eliminado',
                            resposta.data,
                            'success'
                        );
            
                        // Redirecionar para o inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Há um erro',
                            text: 'Não se pode eliminar um projeto.'
                        })
                    })
            }
        })
    })
}

export default btnEliminar;

