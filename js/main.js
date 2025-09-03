import { novaTransacao, listarTransacoes, calcularSaldo } from "./transactions.js";

import { carregarTransacoes } from "./storage.js";

import { adicionarTransacaonaUI, abrirCadastro, fecharCadastro } from "./ui.js";

let tipoSelecionado = null;

window.addEventListener('DOMContentLoaded', () => {
    const transacoes = carregarTransacoes();
    transacoes.forEach(transacao => {
        adicionarTransacaonaUI(transacao);
    });
});

const form = document.querySelector('#cadastro-transacao-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = Date.now(); // Gera um ID único baseado no timestamp;
    const descricao = form.querySelector('#descricao').value;
    const valor = parseFloat(form.querySelector('#valor').value);
    const data = form.querySelector('#data').value;
    const tipo = tipoSelecionado;

    const transacao = novaTransacao(id, descricao, valor, data, tipo);
    adicionarTransacaonaUI(transacao);
    atualizarSaldo();

    form.reset();
});

listarTransacoes().forEach(adicionarTransacaonaUI);

const botaoDespesa = document.querySelector('#botao-despesa');
const botaoReceita = document.querySelector('#botao-receita');
const buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');

botaoDespesa.addEventListener('click', () => {
    tipoSelecionado = 'despesa';
    abrirCadastro(tipoSelecionado);
});
botaoReceita.addEventListener('click', () => {
    tipoSelecionado = 'receita';
    abrirCadastro(tipoSelecionado);
});
buttonFecharCadastro.addEventListener('click', fecharCadastro);

function atualizarSaldo() {
    const saldo = calcularSaldo();
    const saldoElemento = document.querySelector('#saldo-valor');
    saldoElemento.textContent = `R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}
atualizarSaldo();