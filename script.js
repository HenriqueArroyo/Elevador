document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('.bot button');
  const elevator1 = document.querySelector('.elevator');
  const elevator2 = document.querySelector('.elevator2');

  // Iniciar ambos os elevadores no andar 7
  elevator1.style.top = '66.9vh';
  elevator2.style.top = '66.9vh';

  buttons.forEach(function (button) {
      button.addEventListener('click', function () {
          const floorNumber = parseInt(this.textContent.split(' ')[3]);
          const closestElevator = findClosestElevator(floorNumber);

          moveElevator(closestElevator, floorNumber);
      });
  });

  function findClosestElevator(floorNumber) {
      const distanceToElevator1 = Math.abs(getCurrentFloor(elevator1) - floorNumber);
      const distanceToElevator2 = Math.abs(getCurrentFloor(elevator2) - floorNumber);

      if (distanceToElevator1 === distanceToElevator2 && getCurrentFloor(elevator1) === getCurrentFloor(elevator2)) {
          // Se ambos estiverem no mesmo andar, priorize elevator1
          return elevator1;
      }

      return distanceToElevator1 < distanceToElevator2 ? elevator1 : elevator2;
  }

  function getCurrentFloor(elevator) {
      const floorHeight = 11; // Altura do andar, ajuste conforme necessário
      const currentPosition = parseInt(elevator.style.top || getComputedStyle(elevator).top);
      return Math.round(currentPosition / floorHeight);
  }

  function moveElevator(elevator, floorNumber) {
      const floorHeight = 11; // Altura do andar, ajuste conforme necessário
      const targetPosition = (floorNumber - 1) * floorHeight;

      // Animação suave do movimento do elevador
      animateElevator(elevator, targetPosition);
  }

  function animateElevator(elevator, targetPosition) {
      const duration = 1000; // Duração da animação em milissegundos
      const fps = 60;
      const frames = duration / (1000 / fps);
      const currentPosition = parseInt(elevator.style.top || getComputedStyle(elevator).top);

      const distance = targetPosition - currentPosition;
      const step = distance / frames;

      let currentFrame = 0;

      const animationInterval = setInterval(function () {
          currentFrame++;

          if (currentFrame <= frames) {
              const newPosition = currentPosition + step * currentFrame;
              elevator.style.top = `${newPosition}vh`;
          } else {
              clearInterval(animationInterval);
          }
      }, 1000 / fps);
  }
});
