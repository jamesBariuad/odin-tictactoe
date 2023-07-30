const gameBoard = (() => {
  const newGameButton = document.querySelector("#new-game");
  newGameButton.addEventListener("click", () => newGame());

  const newGame = () => {
    count = 0;
    displayController.setPlayerMarkToX();
    board = ["", "", "", "", "", "", "", "", ""];
    displayController.displayElementContent();
    displayController.displayBoard();
  };

  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  let count = 0;

  const handleWin = () => {
    displayController.switchPlayerMark();
    displayController.displayElementContent("win");
    removeAllEventListeners();
  };

  const removeAllEventListeners = () => {
    //nuke all event listeners in container
    const container = document.querySelector(".container");
    displayController.displayElementContent("win");
    const containerClone = container.cloneNode(true);
    container.parentNode.replaceChild(containerClone, container);
  };

  const handleDraw = () => {
    displayController.displayElementContent("draw");
  };

  const checkWinCondition = () => {
    if (count <= 4) {
      count++;
    } else {
      if (
        (board[0] == board[1] && board[1] == board[2] && board[0] != "") ||
        (board[3] == board[4] && board[4] == board[5] && board[3] != "") ||
        (board[6] == board[7] && board[7] == board[8] && board[6] != "") ||
        (board[0] == board[3] && board[3] == board[6] && board[0] != "") ||
        (board[1] == board[4] && board[4] == board[7] && board[1] != "") ||
        (board[2] == board[5] && board[5] == board[8] && board[2] != "") ||
        (board[0] == board[4] && board[4] == board[8] && board[0] != "") ||
        (board[2] == board[4] && board[4] == board[6] && board[2] != "")
      ) {
        return handleWin();
      }
      if (count == 9) {
        return handleDraw();
      }
      count++;
    }
  };

  return { getBoard, checkWinCondition };
})();

const displayController = (() => {
  const displayElement = document.querySelector(".display");
  let playerMark = "x";

  const setPlayerMarkToX = () => {
    return (playerMark = "x");
  };

  displayElement.textContent = `player ${playerMark}'s turn`;

  const displayElementContent = (condition) => {
    if (condition == "win") {
      return (displayElement.textContent = `player ${playerMark} won!`);
    } else if (condition == "draw") {
      return (displayElement.textContent = `It's a tie!`);
    } else {
      return (displayElement.textContent = `player ${playerMark}'s turn`);
    }
  };

  const displayBoard = () => {
    const container = document.querySelector(".container");
    container.replaceChildren();

    for (i = 0; i < gameBoard.getBoard().length; i++) {
      const div = document.createElement("div");
      div.setAttribute("id", `${i}`);
      div.setAttribute("class", "cell");
      div.textContent = gameBoard.getBoard()[i];
      div.addEventListener("click", (e) => putMark(e));
      container.appendChild(div);
    }

    gameBoard.checkWinCondition();
  };

  const switchPlayerMark = () => {
    if (playerMark == "x") {
      playerMark = "o";
    } else {
      playerMark = "x";
    }
  };

  const putMark = (e) => {
    if (e.target.textContent != "") {
      return;
    } else {
      gameBoard.getBoard()[e.target.id] = playerMark;
      switchPlayerMark();
      displayElementContent();
      displayBoard();
    }
  };

  return {
    displayBoard,
    switchPlayerMark,
    putMark,
    displayElementContent,
    setPlayerMarkToX,
  };
})();

const startGame = (() => {
  displayController.displayBoard();
})();
