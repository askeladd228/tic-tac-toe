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

  function checkScoreOne () {
    if (game.gameBoard.length >= 5) {
      winningAxes.forEach(array => {
        let totalPoints = [];
        for (let i = 0; i < 3; i++) {
          const variable = `${array[i]}`;
          // console.log(variable);
          const floor = document.getElementsByClassName(variable);
          // console.log(floor[0].innerHTML);
          if (floor[0].innerHTML == 'X') totalPoints.push('X');
          else return;
        };
        
        if (totalPoints.length == 3) {
          createDiv('Player One Wins!');
          createBtn('Restart', clearField);
        } else return;
      });
    } else return;
  };

  function checkScoreTwo () {
    if (game.gameBoard.length >= 6) {
      winningAxes.forEach(array => {
        let totalPoints = [];
        for (let i = 0; i < 3; i++) {
          const variable = `${array[i]}`;
          const floor = document.getElementsByClassName(variable);
          if (floor[0].textContent == 'O') totalPoints.push('O');
          else return;
        };
        
        if (totalPoints.length == 3) {
          createDiv('Player Two Wins!');
          createBtn('Restart', clearField);
        } else return;
      });
    } else return;
  };

  function createDiv (message) {
    const div = document.createElement('div');
    div.textContent = message;
    announcement.appendChild(div);
  }

  function clearField () {
    gameBoard = [];
    game.floors.forEach(floor => floor.innerText = '');
    announcement.replaceChildren();
  }

  function createBtn(content, func) {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.textContent = content;
    btn.addEventListener('click', func);
    announcement.appendChild(btn);
  }

  return {
    checkScoreOne,
    checkScoreTwo
  }

})();

const game = (function () {
  let gameBoard = [];

  const playerOne = 'X'
  const playerTwo = 'O'

  //cache DOM
  const floors = document.querySelectorAll('.floor');

  floors.forEach(floor => {
    floor.addEventListener('click', addMark);
    floor.addEventListener('click', checkGame.checkScoreOne);
    floor.addEventListener('click', checkGame.checkScoreTwo)
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
    gameBoard,
    floors
  };

})();