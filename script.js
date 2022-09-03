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
          const floor = document.getElementsByClassName(variable);
          if (floor[0].innerHTML == 'X') totalPoints.push('X');
          else return;
        };
        
        if (totalPoints.length == 3) {
          if (player.playerOneVal.length == 1) {
            createDiv(`${player.playerOneVal[0]} Wins!`);
          } else createDiv('Player One Wins!');
          game.rmvEventListener();
          buttons.btnStart.disabled = true;
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
          if (player.playerTwoVal == 1) {
            createDiv(`${player.playerTwoVal[0]} Wins!`);
          } else createDiv('Player Two Wins!');
          game.rmvEventListener();
          buttons.btnStart.disabled = true;
        } else return;
      });
    } else return;
  };

  function createDiv (message) {
    const div = document.createElement('div');
    div.textContent = message;
    announcement.appendChild(div);
  }

  function reset () {
    game.gameBoard.length = 0;
    game.floors.forEach(floor => floor.innerText = '');
    announcement.replaceChildren();
    game.applyEventListener();
    buttons.btnStart.disabled = false;
    game.rmvEventListener();
    player.addLabelInput();
    document.getElementById('playerOne').value = ''
    document.getElementById('playerTwo').value = ''
    player.playerOneVal.length = 0;
    player.playerTwoVal.length = 0;
  }

  function checkDraw () {
    if (game.gameBoard.length == 9) {
      createDiv("It's a draw!");
      buttons.btnStart.disabled = false;
      game.rmvCheckDraw();
    };
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
    checkScoreTwo,
    announcement,
    reset,
    checkDraw
  }

})();

const game = (function () {
  let gameBoard = [];

  const playerOne = 'X'
  const playerTwo = 'O'

  //cache DOM
  const floors = document.querySelectorAll('.floor');

  function applyEventListener () {
    floors.forEach(floor => {
    floor.addEventListener('click', addMark);
    floor.addEventListener('click', checkGame.checkScoreOne);
    floor.addEventListener('click', checkGame.checkScoreTwo);
    floor.addEventListener('click', checkGame.checkDraw);
    });
  }

  function rmvEventListener () {
    floors.forEach(floor => {
    floor.removeEventListener('click', addMark);
    floor.removeEventListener('click', checkGame.checkScoreOne);
    floor.removeEventListener('click', checkGame.checkScoreTwo);
    console.log('this is working')
    });
  }

  function rmvCheckDraw () {
    floors.forEach(floor => {
      floor.removeEventListener('click', checkGame.checkDraw);
    });
  }

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
    floors,
    rmvEventListener,
    applyEventListener,
    rmvCheckDraw
  };

})();

const player = (function () {
  //cache DOM
  let playerOneVal = [];
  let playerTwoVal = [];
  const playerOne = document.querySelector('.playerOne');
  const playerTwo = document.querySelector('.playerTwo');
  const playerOneLabel = document.querySelector('.labelOne');
  const playerTwoLabel = document.querySelector('.labelTwo');
  const playerOneInput = document.getElementById('playerOne');
  const playerTwoInput = document.getElementById('playerTwo');

  function uploadPlayer () {
    if (document.getElementById('playerOne').value !== '') {
      playerOneVal.push(document.getElementById('playerOne').value);
      playerOne.replaceChildren(`${playerOneVal[0]}`);
    } else playerOne.replaceChildren('Player One');
    if (document.getElementById('playerTwo').value !== '') {
      playerTwoVal.push(document.getElementById('playerTwo').value);
      playerTwo.replaceChildren(`${playerTwoVal[0]}`);
    
    } else playerTwo.replaceChildren('Player Two');
  }

  function addLabelInput () {
    playerOne.replaceChildren(playerOneLabel, playerOneInput);
    playerTwo.replaceChildren(playerTwoLabel, playerTwoInput);
  }

  return {
    playerOneVal,
    playerTwoVal,
    uploadPlayer,
    addLabelInput
  }
})();

const buttons = (function () {
  //cache DOM
  const btnRestart = document.querySelector('.restart');
  const btnStart = document.querySelector('.start');

  function start () {
    btnStart.addEventListener('click', game.applyEventListener);
    btnStart.addEventListener('click', player.uploadPlayer);
  }

  function restart (){
    btnRestart.addEventListener('click', checkGame.reset);
  }

  start();
  restart();

  return {
    btnRestart,
    btnStart
  }
})();