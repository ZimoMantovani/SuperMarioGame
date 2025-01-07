const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const logo = document.querySelector('.game-over-lg');
const clouds = document.querySelector('.clouds');
const retryButton = document.getElementById('retry');

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

let score = 0;
let bestScore =localStorage.getItem('bestScore') || 0;
let scoreSet = false;

document.querySelector('#bestScore').innerHTML = `BEST SCORE: ${bestScore}`;

function scoreCount() {
    score++;
    document.querySelector('#score').innerHTML = `SCORE: ${score}`;
}

function verifyBestScore() {
    if (score > bestScore) {
        bestScore = score; // Atualiza o best score
        localStorage.setItem('bestScore', bestScore); // Salva o novo best score
        document.querySelector('#bestScore').innerHTML = `BEST SCORE: ${bestScore}`;
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Incrementa o score quando o Mario pula o cano
    if (pipePosition > 0 && pipePosition < 120 && marioPosition > 80 && !scoreSet) {
        scoreCount();
        scoreSet = true; // Evita contar novamente para o mesmo cano

    }

    // Reseta o scoreSet quando o cano sai da tela
    if (pipePosition < 0) {
        scoreSet = false;
    }

    // Verifica colisão
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
        verifyBestScore();
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        logo.style.display = 'block'; // Torna a imagem visível
        clouds.style.animationPlayState = 'paused';

        retryButton.style.display = 'block';

        clearInterval(loop);
    }
}, 10);

retryButton.addEventListener('click', () => {
    location.reload();
});


document.addEventListener('keydown', jump);
