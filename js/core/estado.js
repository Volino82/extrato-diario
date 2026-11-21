import { lerDados, salvarDados } from './armazenamento.js';

function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function dataHoje() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function normalizarAgente (nome) {
    return nome
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

export function iniciarPesquisaDoDia({ agenteLista, distrito, nucleo }) {
    const dados = lerDados();
    const agenteChave = normalizarAgente(agenteLista);
    const data = dataHoje();

    let dia = dados.dias.find(
        (d) => d.agenteChave === agenteChave && d.data === data
    );

    if (!dia) {
        dia = {
            id: gerarId(),
            data,
            agenteLista,
            agenteChave,
            distrito,
            nucleo,
            status: 'aberto',
            dataCriacao: new Date().toISOString()
        };
        dados.dias.push(dia);
    }

    dados.agenteTerritorial = { agenteLista, distrito, nucleo };

    if (!salvarDados(dados)) return null;
    return dia;
}

export function buscarDia(id) {
    const dados = lerDados();
    return dados.dias.find((d) => d.id === id) || null;
}