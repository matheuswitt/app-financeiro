const sectionCadastro = document.querySelector('#cadastro-transacao-container');
const buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');
const overlay = document.createElement('div');

const botaoTransferencia = document.querySelector('#botao-transferencia');
const botaoDespesa = document.querySelector('#botao-despesa');
const botaoReceita = document.querySelector('#botao-receita');


botaoDespesa.addEventListener('click', () => {
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    sectionCadastro.classList.add('background-despesa');
    botaoDespesa.classList.remove('nao-selecionado');
    botaoReceita.classList.add('nao-selecionado');
    botaoTransferencia.classList.add('nao-selecionado');
});

botaoReceita.addEventListener('click', () => {
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    sectionCadastro.classList.remove('background-despesa', 'background-transferencia');
    sectionCadastro.classList.add('background-receita');
    botaoReceita.classList.remove('nao-selecionado');
    botaoDespesa.classList.add('nao-selecionado');
    botaoTransferencia.classList.add('nao-selecionado');
});

botaoTransferencia.addEventListener('click', () => {
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    sectionCadastro.classList.remove('background-despesa', 'background-receita');
    sectionCadastro.classList.add('background-transferencia');
    botaoTransferencia.classList.remove('nao-selecionado');
    botaoDespesa.classList.add('nao-selecionado');
    botaoReceita.classList.add('nao-selecionado');
});

sectionCadastro.addEventListener('click', () => {
    sectionCadastro.style.transition = 'top 0.5s ease';
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    buttonFecharCadastro.style.transition = 'top 0.6s ease';
    overlay.classList.add('overlay');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.classList.add('visivel');
    }, 100);
    document.body.appendChild(overlay);
});

buttonFecharCadastro.addEventListener('click', () => {
    sectionCadastro.style.transition = 'top 0.5s ease';
    sectionCadastro.classList.remove('cadastro-aberto');
    buttonFecharCadastro.style.top = '95%';
    buttonFecharCadastro.style.transition = 'top 0.3s ease';
    overlay.classList.remove('visivel');
    setTimeout(() => {
        overlay.classList.remove('overlay');
    }, 300);
});

