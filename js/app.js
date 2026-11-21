import { montar as montarInicio } from './views/inicio.js';

const main = document.getElementById('main');

const rotas = {
    inicio: { arquivo: 'html/inicio.html', montar: montarInicio }
};

function lerRota() {
    const hash = window.location.hash || '#/inicio';
    const [ nome, parametro] = hash.slice(2).split('/');
    return { nome, parametro };
}

async function mostrarTela() {
    const { nome, parametro } = lerRota();
    const rota = rotas[nome] || rotas.inicio;

    try {
        const resposta = await fetch(rota.arquivo);

        if (!resposta.ok) {
            throw new Error (`Erro ${resposta.status} ao buscar ${rota.arquivo}`);
        }

        const html = await resposta.text();
        main.innerHTML = html;
        rota.montar(main);

    } catch (erro) {
        console.error(erro);
        main.textContent = 'Não foi possível carregar esta tela.';
    }
}

window.addEventListener('hashchange', mostrarTela);
mostrarTela();

