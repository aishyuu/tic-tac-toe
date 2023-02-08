const cells = document.querySelectorAll('.cell');
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;
const boardState = Array(cells.length);
boardState.fill(null);

buttonReset = document.querySelector('.buttonReset');
textTurn = document.querySelector('.textTurn');

buttonReset.addEventListener('click', () => {
    initial(cells);
})

cells.forEach(cell => {cell.addEventListener("click", cellClick)});

function initial(cellSet) {
    cellSet.forEach(cell => {
        cell.innerText = "";
    });
    turn = PLAYER_X;
    textTurn.innerText = `Player X's Turn`;
    boardState.fill(null);
    setHoverText(cellSet);
}

function setHoverText(cellSet) {
    cellSet.forEach(cell => {
        cell.classList.remove("x-hover");
        cell.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    cellSet.forEach((cell) => {
        if(cell.innerText == "") {
            cell.classList.add(hoverClass);
        }
    })
}

function cellClick(e) {
    const cell = e.target;
    if(cell.innerText != "") {
        return;
    }

    cell.innerText = turn;
    boardState[cell.dataset.index] = turn;
    // console.log(boardState);

    if(turn == PLAYER_X) {
        turn = PLAYER_O;
        textTurn.innerText = `Player ${PLAYER_O}'s Turn`;
    } else {
        turn = PLAYER_X;
        textTurn.innerText = `Player ${PLAYER_X}'s Turn`
    }
    // console.log(e);
    
    setHoverText(cells);
    checkWinner();
}

function checkWinner() {
    for(winningCombination of winningCombinations) {
        const { combo, strikeClass } = winningCombination;
        const cellValue1 = boardState[combo[0] - 1];
        const cellValue2 = boardState[combo[1] - 1];
        const cellValue3 = boardState[combo[2] - 1];

        if(
            cellValue1 != null &&
            cellValue1 === cellValue2 &&
            cellValue1 === cellValue3
        ) {
            console.log('Winner Found!');
            return;
        }
    }

    for(let i = 0; i < boardState.length; i++) {
        if(boardState[i] == null) {
            console.log("No current winner");
            return;
        }
    };
    console.log("Draw");
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];

initial(cells);