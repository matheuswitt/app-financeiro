// Funções de interfaçe e manipulações do DOM

import { removerTransacaoDoArmazenamento } from './storage.js';
import { calcularSaldo } from './transactions.js';

let sectionCadastro = document.querySelector('#cadastro-transacao-container');
let buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');
let overlay = document.createElement('div');

export function abrirCadastro(tipo) {
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.display = 'block';
    sectionCadastro.classList.remove('background-despesa', 'background-receita');

    if (tipo) {
        sectionCadastro.classList.add(`background-${tipo}`);
    }

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('visivel'), 100);

    const hoje = new Date().toISOString().split('T')[0];
    sectionCadastro.querySelector('#data').value = hoje;
    const campoDescricao = sectionCadastro.querySelector('#descricao');
    campoDescricao.focus();

    overlay.addEventListener('click', fecharCadastro);
}

export function fecharCadastro() {
    sectionCadastro.classList.remove('cadastro-aberto');
    buttonFecharCadastro.style.top = '';
    overlay.classList.remove('overlay-visivel');
    setTimeout(() => {
        overlay.classList.remove('overlay');
        document.body.removeChild(overlay);
    }, 100);
}

export function adicionarTransacaonaUI(transacao) {
    let lista = document.querySelector('#transacoes-lista');
    let li = document.createElement('li');
    li.classList.add('transacao-item');
    let remover = document.createElement('button');
    remover.textContent = 'X';
    remover.classList.add('remover-button');
    remover.addEventListener('click', () => {
        lista.removeChild(li);
        // Aqui você pode adicionar a lógica para remover a transação do armazenamento também
        removerTransacaoDoArmazenamento(transacao.id);
        const saldoElemento = document.querySelector('#saldo-valor');
        saldoElemento.textContent = `R$ ${calcularSaldo().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    });
    li.innerHTML = `
        <div class="transacao-info">
            <p class="transacao-descricao">${transacao.descricao}</p>
            <time class="transacao-data">${transacao.data}</time>
            </div>
            <p class="transacao-valor ${transacao.tipo}">R$ ${transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            `;
    lista.appendChild(li);
    li.appendChild(remover);
}

