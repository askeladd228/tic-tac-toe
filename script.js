const game = (function () {
  let gameBoard = ['X', 'O', 'X', 'O'];

  const playerOne = 'X'
  const playerTwo = 'O'

  //cache DOM
  const floors = document.querySelectorAll('.floor');


  floors.forEach(floor => {
    floor.addEventListener('click', addMark);
  });

  function addMark() {
    this.innerText = gameBoard[-1];
  }

  function addMarkToSystem () {
    gameBoard.push(player);
  }


})();