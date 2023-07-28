const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;
  let count = 0;
  let winner = false;

  const handleWin = () => {
    const dialog = document.createElement("dialog");
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
  });
    dialog.innerHTML = `
        <p>${displayController.getPlayerMark()} wins!</p>
        <form method="dialog">
          <button>OK</button>
        </form>`;

        

    // dialog.textContent = displayController.getPlayerMark() + "wins";
    const body = document.querySelector("body");
    body.appendChild(dialog);
    dialog.showModal()
  };

  const checkWinCondition = () => {
    if (count <= 4) {
      count++;
      return console.log(count);
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
        console.log("draw");
      }
      count++;
    }
  };

  return { getBoard, checkWinCondition, winner };
})();

const displayController = (() => {
  const board = gameBoard.getBoard();
  let playerMark = "x";

  const displayBoard = () => {
    const container = document.querySelector(".container");
    container.replaceChildren();

    for (i = 0; i < board.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("id", `${i}`);
      div.setAttribute("class", "cell");
      div.textContent = board[i];
      div.addEventListener("click", (e) => putMark(e));
      container.appendChild(div);
    }

    gameBoard.checkWinCondition();
  };

  const getPlayerMark = () => {
    if (playerMark == "x") {
      return (playerMark = "o");
    } else {
      return (playerMark = "x");
    }
  };

  const putMark = (e) => {
    if (e.target.textContent != "") {
      return;
    } else {
      board[e.target.id] = playerMark;
      getPlayerMark();
      displayBoard();
    }
  };

  return { displayBoard, getPlayerMark };
})();

const gameFlow = (() => {
  displayController.displayBoard();
  // while (!g) {
  //   displayController.displayBoard();
  //   gameBoard.checkWinCondition();
  // }
})();

const playerFactory = (name, sign) => {
  return { name, sign };
};
