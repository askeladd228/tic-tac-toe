const game = (function () {
  let gameBoard = [];

  const playerOne = 'X'
  const playerTwo = 'O'

  //cache DOM
  const floors = document.querySelectorAll('.floor');


  floors.forEach(floor => {
    floor.addEventListener('click', addMark);
  });

  function addMark() {
    if ((this.innerText == 'X') || (this.innerText == 'O')) return;
    else {
      addMarkToSystem();
      this.innerText = gameBoard[gameBoard.length-1];
    }
  }

  function addMarkToSystem () {
    if (gameBoard[gameBoard.length-1] == playerOne) {
      gameBoard.push(playerTwo);
    } else gameBoard.push(playerOne);
  };


})();