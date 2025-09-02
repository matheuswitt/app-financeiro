// armazenamento: por enquanto localStorage

export function salvarTransacao(transacao) {
    const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
    transacoes.push(transacao);
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

export function carregarTransacoes() {
    return JSON.parse(localStorage.getItem('transacoes')) || [];
}