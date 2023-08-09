msgDiv = document.querySelector(".msg");
cells = document.querySelectorAll(".cells div");
resetBtn = document.querySelector(".resetBtn");
const Player = (name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;
  return { getName, getMarker };
};
function markCell(e) {
  num = e.target.dataset.val;
  gameBoard.mark(num);
  gameBoard.check();
}
const player1 = Player("zedd", "X");
const player2 = Player("xenos", "O");

const gameBoard = (() => {
  let winner = false;
  let currentPlayer = player1;
  let arr = [null, null, null, null, null, null, null, null, null];
  const check = () => {
    for (i = 0; i <= 6; i += 3) {
      if (arr[i] != null && arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2]) {
        winner = true;
        break;
      }
    }
    for (i = 0; i < 3; i++) {
      if (arr[i] != null && arr[i] == arr[i + 3] && arr[i] == arr[i + 6]) {
        winner = true;
        break;
      }
    }
    if (arr[0] != null && arr[0] == arr[4] && arr[0] == arr[8]) {
      winner = true;
    }
    if (arr[2] != null && arr[2] == arr[4] && arr[2] == arr[6]) {
      winner = true;
    }
    if (winner) {
      msgDiv.textContent = currentPlayer.getName();
    } else {
      if (currentPlayer == player1) {
        currentPlayer = player2;
      } else currentPlayer = player1;
    }
  };
  const mark = (num) => {
    if(winner==false){
        counter = 2;
        console.log(num);
        cellId = "#cell" + num;
        marker = currentPlayer.getMarker();
        cell = document.querySelector(cellId);
        cell.textContent = marker;
        arr[num] = marker;
    }else alert("Please Reset!");
  };
  const reset = () => {
    cells.forEach((cell) => {
      cell.textContent = ".";
    });
    arr = [null, null, null, null, null, null, null, null, null];
    currentPlayer = player1;
    winner = false;
    msgDiv.textContent="";
  };
  return { mark, check, reset };
})();
cells.forEach((cell) => {
  cell.addEventListener("click", markCell);
});
resetBtn.addEventListener("click", gameBoard.reset);
