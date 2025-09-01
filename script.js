const sectionCadastro = document.querySelector('#cadastro-transacao-container');
const buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');

sectionCadastro.addEventListener('click', () => {
    sectionCadastro.style.transition = 'top 0.5s ease';
    sectionCadastro.classList.add('cadastro-aberto');
    buttonFecharCadastro.style.top = '11%';
    buttonFecharCadastro.style.transition = 'top 0.6s ease';
});

buttonFecharCadastro.addEventListener('click', () => {
    sectionCadastro.style.transition = 'top 0.5s ease';
    sectionCadastro.classList.remove('cadastro-aberto');
    buttonFecharCadastro.style.top = '95%';
    buttonFecharCadastro.style.transition = 'top 0.3s ease';
});