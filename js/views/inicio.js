import { iniciarPesquisaDoDia } from "../core/estado.js";

export function montar(container) {
    const formulario = container.querySelector('form');
    if(!formulario) return;

    formulario.addEventListener('submit',(evento) => {
        evento.preventDefault();

        const dados = new FormData(formulario);
        const agenteLista = dados.get('agenteLista').trim();
        const distrito = dados.get('distrito').trim();
        const nucleo = dados.get('nucleo').trim();

        if(!agenteLista || !distrito || !nucleo) {
            console.log('Preencha todos os campos.');
            return;
        }

        const dia = iniciarPesquisaDoDia({ agenteLista, distrito, nucleo });

        if (!dia) {
            console.log('Não foi possível salvar os dados.');
            return;
        }
        
        console.log('Dia: ', dia);
        window.location.hash = `#/rua/${dia.id}`;
    });
}