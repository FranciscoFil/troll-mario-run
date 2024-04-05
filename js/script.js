const mario = document.querySelector('.mario');
const tunel = document.querySelector('.tunel');
const resetButton = document.querySelector('.reset');
const tempoSegundos = document.querySelector('.tempo-segundos');

let segundos = 0;
let minutos = 0;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const calcularNovaDuracaoAnimacao = (segundos) => {
    if (segundos >= 1000) {
        return '0.001s'; 
    } else if (segundos >= 300) {
        return '0.04s'; 
    } else if (segundos >= 250) {
        return '0.06s'; 
    } else if (segundos >= 210) {
        return '0.09s'; 
    } else if (segundos >= 170) {
        return '0.4s'; 
    } else if (segundos >= 130) {
        return '0.7s'; 
    } else if (segundos >= 90) {
        return '1s'; 
    } else if (segundos >= 40 ) {
        return '1.5s'; 
    } else {
        return '2s'; 
    }
};

const loop = setInterval(() => {
    const tunelPosition = tunel.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (tunelPosition <= 120 && tunelPosition > 0 && marioPosition < 80) {
        tunel.style.animation = 'none';
        tunel.style.left = `${tunelPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        resetButton.style.display = "block";
    } else {
        segundos++;
        if (segundos === 100) {
            segundos = 0;
            minutos++;
        }

        const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
        const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
        tempoSegundos.textContent = `${minutosFormatados}:${segundosFormatados}`;

        const novaDuracaoAnimacao = calcularNovaDuracaoAnimacao(segundos);
        tunel.style.animationDuration = novaDuracaoAnimacao;
    }
}, 100); 

document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        location.reload();
    }
});

document.addEventListener('keydown', jump);

resetButton.addEventListener('click', () => {
    location.reload();
});
