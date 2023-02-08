const cells = document.querySelectorAll('.cell');
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

cells.forEach(cell => {cell.addEventListener("click", cellClick)});

function initial(cellSet) {
    cellSet.forEach(cell => {
        cell.innerText = "";
    });
    turn = PLAYER_X;

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
    console.log(e);
    e.target.innerText = turn;
}

initial(cells);