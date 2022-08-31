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

  return {
      gameBoard
  };

})();

const player = (name) => {
  let playerName = name;

}

const checkGame = (function () {
  const winningAxes = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [7,5,3]
  ];

  //cache DOM
  const announcement = document.querySelector('.announcement')

  winningAxes.forEach(array => {
    let totalPoints = [];
    for (let i = 0; i > 3; i++) {
      const floor = document.getElementsByClassName(array[i]);
      if (floor.innerText == 'X') total.push[null];
      else return;
    };
    if (totalPoints.length == 3) {
      console.log('Player One Wins!');
    }
  });

  function createDiv (message) {
    const div = document.createElement('div');
    div.textContent = message;
    announcement.appendChild(div);
  }

  function clearField () {
    gameBoard = [];
    floors.forEach(floor => floor.innerText = '');
  }


})();