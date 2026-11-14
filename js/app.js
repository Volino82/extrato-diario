const main = document.getElementById('main');

const rotas = {
    '#/inicio': 'html-pages/inicio.html'
};

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
    } catch (erro) {
        console.error(erro);
        main.textContent = 'Não foi possível carregar esta tela.';
    }
}

window.addEventListener('hashchange', mostrarTela);
mostrarTela();