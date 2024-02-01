document.addEventListener("DOMContentLoaded", function() {
    // Obtenha todos os botões de andar
    const buttons = document.querySelectorAll('.bot button');
  
    // Adicione um ouvinte de evento a cada botão
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Obtenha o número do andar a partir do texto do botão
        const floorNumber = parseInt(this.textContent.split(' ')[3]);
  
        // Encontre o elevador mais próximo
        const closestElevator = findClosestElevator(floorNumber);
  
        // Mova o elevador para o andar selecionado
        moveElevator(closestElevator, floorNumber);
      });
    });
  
    function findClosestElevator(floorNumber) {
      // Aqui você pode implementar lógica para encontrar o elevador mais próximo
      // Por exemplo, você pode calcular a distância entre o elevador e o andar desejado
  
      // Para simplificar, vou assumir que o elevador 1 está sempre mais próximo
      return document.querySelector('.elevator');
    }
  
    function moveElevator(elevator, floorNumber) {
      // Aqui você pode implementar a lógica para mover o elevador para o andar desejado
      // Vou assumir que o elevador se moverá diretamente para a posição do andar
  
      // Altura de um andar
      const floorHeight = 11;

  
      // Mover o elevador para a posição do andar
      elevator.style.top = `${(floorNumber - 1) * floorHeight}vh`;
    }
  });
  