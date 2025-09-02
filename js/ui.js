// Funções de interfaçe e manipulações do DOM

let sectionCadastro = document.querySelector('#cadastro-transacao-container');
let buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');
let overlay = document.createElement('div');

export function abrirCadastro(tipo) {
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    sectionCadastro.classList.remove('background-despesa', 'background-receita');

    if (tipo) {
        sectionCadastro.classList.add(`background-${tipo}`);
    }

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('overlay-visivel'), 100);
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
    li.innerHTML = `
        <div class="transacao-info">
            <p class="transacao-descricao">${transacao.descricao}</p>
            <time class="transacao-data">${transacao.data}</time>
        </div>
        <p class="transacao-valor ${transacao.tipo}">R$ ${transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
    `;
    lista.appendChild(li);
}

