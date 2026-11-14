import { montar as montarInicio } from './views/inicio.js';

const main = document.getElementById('main');

const rotas = {
    '#/inicio': { arquivo: 'html-pages/inicio.html', montar: montarInicio }
};

async function mostrarTela() {
    const hash = window.location.hash || '#/inicio';
    const rota = rotas[hash] || rotas['#/inicio'];

    try {
        const resposta = await fetch(rota.arquivo);

        if (!resposta.ok) {
            throw new Error (`Erro ${resposta.status} ao buscar ${rota.arquivo}`);
        }

        const html = await resposta.text();
        main.innerHTML = html;
        rota.montar(main);;

    } catch (erro) {
        console.error(erro);
        main.textContent = 'Não foi possível carregar esta tela.';
    }
}

window.addEventListener('hashchange', mostrarTela);
mostrarTela();

