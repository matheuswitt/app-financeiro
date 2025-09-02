// Funções relacionadas a transações financeiras

import { salvarTransacao, carregarTransacoes } from './storage.js';

export function novaTransacao(descricao, valor, data, tipo) {
    const transacao = { descricao, valor, data, tipo };
    salvarTransacao(transacao);
    return transacao;
}

export function listarTransacoes() {
    return carregarTransacoes();
}

export function calcularSaldo() {
    const transacoes = listarTransacoes();
    return transacoes.reduce((acc, transacao) => {
        if (transacao.tipo === 'receita') {
            return acc + transacao.valor;
        } else {
            return acc - transacao.valor;
        }
    }, 0);
}