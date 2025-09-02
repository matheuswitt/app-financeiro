const sectionCadastro = document.querySelector('#cadastro-transacao-container');
const buttonFecharCadastro = document.querySelector('#fechar-cadastro-button');
const overlay = document.createElement('div');

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