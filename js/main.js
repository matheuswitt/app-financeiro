import { novaTransacao, listarTransacoes, calcularSaldo } from "./transactions.js";

import { adicionarTransacaonaUI, abrirCadastro, fecharCadastro } from "./ui.js";

let tipoSelecionado = null;

const form = document.querySelector('#cadastro-transacao-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const descricao = form.querySelector('#descricao').value;
    const valor = parseFloat(form.querySelector('#valor').value);
    const data = form.querySelector('#data').value;
    const tipo = tipoSelecionado;

    const transacao = novaTransacao(descricao, valor, data, tipo);
    adicionarTransacaonaUI(transacao);
    atualizarSaldo()

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