const CHAVE = 'extrato-diario:dados';
const VERSAO = '1.0';

function dadosIniciais() {
    return {
        versao: VERSAO,
        agenteTerritorial: null,
        dias: [],
        ruas: [],
        visitas: []
    };
}

export function lerDados() {
    try {
        const texto = localStorage.getItem(CHAVE);
        if (!texto) return dadosIniciais();
        return JSON.parse(texto);
    } catch (erro) {
        console.error('Erro ao ler dados do armazenamento local:', erro);
        return dadosIniciais();
    }
}

export function salvarDados(dados) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(dados));
        return true;
    } catch (erro) {
        console.error('Erro ao salvar dados no armazenamento local:', erro);
        return false;
    }
}