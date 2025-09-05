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

    document.body.classList.add('no-scroll');
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
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('visivel');
    setTimeout(() => {
        overlay.classList.remove('overlay');
        document.body.removeChild(overlay);
    }, 100);
}

export function adicionarTransacaonaUI(transacao) {
    // lista (ul) vira ul
    // li (item da lista) vira liContainer
    // transacaoConteudo (div)

    let ul = document.querySelector('#transacoes-lista');
    let liContainer = document.createElement('li');
    liContainer.classList.add('transacao-container');
    let transacaoItem = document.createElement('div');
    transacaoItem.classList.add('transacao-item');

    let remover = document.createElement('button');
    remover.classList.add('remover-button');
    remover.type = 'button';
    remover.title = 'Remover transação';
    remover.textContent = 'remover';
    // Adiciona o "X" de confirmação dentro do botão de remover (remover)

    let removerDefinitivo = document.createElement('div');
    removerDefinitivo.classList.add('remover-confirmacao');
    liContainer.appendChild(removerDefinitivo);
    removerDefinitivo.textContent = 'X';

    remover.addEventListener('click', () => {
        transacaoItem.classList.toggle('deslocado');
        if (remover.textContent === 'remover') {
            remover.textContent = 'cancelar';
            remover.classList.add('cancelar');
        } else {
            remover.textContent = 'remover';
            remover.classList.remove('cancelar');
        }
        document.addEventListener('click', (event) => {
            if (!liContainer.contains(event.target)) {
                transacaoItem.classList.remove('deslocado');
                remover.textContent = 'remover';
                remover.classList.remove('cancelar')
                document.removeEventListener('click', arguments.callee);
            }
        });
    });

    removerDefinitivo.addEventListener('click', () => {
        ul.removeChild(liContainer);
        // Aqui você pode adicionar a lógica para remover a transação do armazenamento também
        removerTransacaoDoArmazenamento(transacao.id);
        const saldoElemento = document.querySelector('#saldo-valor');
        saldoElemento.textContent = `R$ ${calcularSaldo().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    });

    transacaoItem.innerHTML = `
        <div class="transacao-info">
            <p class="transacao-descricao">${transacao.descricao}</p>
            <time class="transacao-data">${transacao.data}</time>
            </div>
            <p class="transacao-valor ${transacao.tipo}">R$ ${transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            `;
    ul.appendChild(liContainer);
    liContainer.appendChild(transacaoItem);
    transacaoItem.appendChild(remover);
}