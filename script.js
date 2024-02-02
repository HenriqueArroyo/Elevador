document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.bot button');
    const elevator1 = document.querySelector('.elevator');
    const elevator2 = document.querySelector('.elevator2');

    // Iniciar ambos os elevadores no andar 7
    elevator1.style.top = '66.9vh';
    elevator2.style.top = '66.9vh';

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const andarNum = parseInt(this.textContent.split(' ')[3]);
            const closestElevator = encontrarElevadorPro(andarNum);

            moverElevador(closestElevator, andarNum);

            // Adiciona a classe 'ativo' ao botão clicado
            buttons.forEach(function (btn) {
                btn.classList.remove('ativo');
            });
            this.classList.add('ativo');
        });
    });

    function encontrarElevadorPro(andarNum) {
        const distanciaElevador1 = calcularDistancia(elevator1, andarNum);
        const distanciaElevador2 = calcularDistancia(elevator2, andarNum);

        // Verifica se o elevador mais baixo está mais longe do que o elevador mais alto
        if (
            getAndarAtual(elevator1) > getAndarAtual(elevator2) &&
            distanciaElevador1 > distanciaElevador2
        ) {
            return elevator2;
        }

        return distanciaElevador1 < distanciaElevador2 ? elevator1 : elevator2;
    }

    function calcularDistancia(elevator, andarNum) {
        const distanciaAndar = Math.abs(getAndarAtual(elevator) - andarNum);
        const distanciaVertical = Math.abs(
            parseInt(elevator.style.top || getComputedStyle(elevator).top) -
            (andarNum - 1) * 11.1
        );

        // Combina a distância horizontal e vertical para dar peso à posição vertical
        return distanciaAndar + distanciaVertical;
    }

    function getAndarAtual(elevator) {
        const alturaAndar = 11; // Altura do andar, ajuste conforme necessário
        const posicaoAtual = parseInt(elevator.style.top || getComputedStyle(elevator).top);
        return Math.round(posicaoAtual / alturaAndar);
    }

    function moverElevador(elevator, andarNum) {
        const alturaAndar = 11.1; // Altura do andar, ajuste conforme necessário
        const posicaoFinal = (andarNum - 1) * alturaAndar;

        // Animação suave do movimento do elevador
        animarElevador(elevator, posicaoFinal);
    }

    function animarElevador(elevator, posicaoFinal) {
        const duracao = 1000; // Duração da animação em milissegundos
        const fps = 60;
        const frames = duracao / (1000 / fps);
        const posicaoAtual = parseInt(elevator.style.top || getComputedStyle(elevator).top);

        const distancia = posicaoFinal - posicaoAtual;
        const passo = distancia / frames;

        let frameAtual = 0;

        const intervaloAnimacao = setInterval(function () {
            frameAtual++;

            if (frameAtual <= frames) {
                const novaPosicao = posicaoAtual + passo * frameAtual;
                elevator.style.top = `${novaPosicao}vh`;
            } else {
                clearInterval(intervaloAnimacao);
            }
        }, 1000 / fps);
    }
});
