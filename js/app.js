const main = document.getElementById('main');

const rotas = {
    '#/inicio': 'html-pages/inicio.html'
};

function ligarFormularioInicio() {
    const formulario = main.querySelector('form');
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

async function mostrarTela() {
    const hash = window.location.hash || '#/inicio';
    const arquivo = rotas[hash] || rotas['#/inicio'];

    try {
        const resposta = await fetch(arquivo);

        if (!resposta.ok) {
            throw new Error (`Erro ${resposta.status} ao buscar ${arquivo}`);
        }

        const html = await resposta.text();
        main.innerHTML = html;
        ligarFormularioInicio();

    } catch (erro) {
        console.error(erro);
        main.textContent = 'Não foi possível carregar esta tela.';
    }
}

window.addEventListener('hashchange', mostrarTela);
mostrarTela();