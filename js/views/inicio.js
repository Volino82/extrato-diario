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

        console.log({ agenteLista, distrito, nucleo});
    });
}