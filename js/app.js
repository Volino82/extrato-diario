import { montar as montarInicio } from './views/inicio.js';
import {montar as montarRua } from './views/rua.js';
import { limparDados } from './core/armazenamento.js';

const main = document.getElementById('main');

const rotas = {
    inicio: { arquivo: 'html/inicio.html', montar: montarInicio },
    rua: {arquivo: 'html/rua.html', montar: montarRua }
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
        rota.montar(main, parametro);

    } catch (erro) {
        console.error(erro);
        main.textContent = 'Não foi possível carregar esta tela.';
    }
}

document.querySelector('[data-acao="limpar-memoria"]').addEventListener('click', () => {
    if (!confirm('Apagar todos os dados salvos?')) return;
    limparDados();
    window.location.hash = '#/inicio';
    window.location.reload();
});

window.addEventListener('hashchange', mostrarTela);
mostrarTela();

