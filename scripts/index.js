let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let colums = 9;
let score = 0;

let currTile;
let otherTile;

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let currCoords = currTile.id.split("-");
  let row = parseInt(currCoords[0]);
  let column = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let row2 = parseInt(otherCoords[0]);
  let column2 = parseInt(otherCoords[1]);

  let moveLeft = column2 == column - 1 && row == row2;
  let moveRight = column2 == column + 1 && row == row2;

  let moveUp = row2 == row - 1 && column == column2;
  let moveDown = row2 == row + 1 && column == column2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();

    if (!validMove) {
      let currImg = currTile.src;
      let otherImg = otherTile.src;
      currTile.src = otherImg;
      otherTile.src = currImg;
    }
  }
}

function crushThree() {
  //checar linhas
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums - 2; j++) {
      let candy1 = board[i][j];
      let candy2 = board[i][j + 1];
      let candy3 = board[i][j + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "../assets/images/blank.png";
        candy2.src = "../assets/images/blank.png";
        candy3.src = "../assets/images/blank.png";
        score += 30;
      }
    }
  }

  //checar colunas
  for (let i = 0; i < colums; i++) {
    for (let j = 0; j < rows - 2; j++) {
      let candy1 = board[j][i];
      let candy2 = board[j + 1][i];
      let candy3 = board[j + 2][i];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "../assets/images/blank.png";
        candy2.src = "../assets/images/blank.png";
        candy3.src = "../assets/images/blank.png";
        score += 30;
      }
    }
  }
}

function crushCandy() {
  crushThree();
  document.getElementById("score").innerText = score;
}

function checkValid() {
  //checar linhas
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums - 2; j++) {
      let candy1 = board[i][j];
      let candy2 = board[i][j + 1];
      let candy3 = board[i][j + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //checar colunas
  for (let i = 0; i < colums; i++) {
    for (let j = 0; j < rows - 2; j++) {
      let candy1 = board[j][i];
      let candy2 = board[j + 1][i];
      let candy3 = board[j + 2][i];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  return false;
}

function startGame() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < colums; j++) {
      // <img id="0-0" src="./images/Red.png">
      let tile = document.createElement("img");
      tile.id = `${i.toString()}-${j.toString()}`;
      tile.src = `../assets/images/${randomCandy()}.png`;

      //Arrastar o objeto
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
}

function slideCandy() {
  for (let i = 0; i < colums; i++) {
    let ind = rows - 1;

    for (let j = colums - 1; j >= 0; j--) {
      if (!board[j][i].src.includes("blank")) {
        board[ind][i].src = board[j][i].src;
        ind -= 1;
      }
    }

    for (let j = ind; j >= 0; j--) {
      board[j][i].src = "../assets/images/blank.png";
    }
  }
}

function generateCandy() {
  for (let i = 0; i < colums; i++) {
    if (board[0][i].src.includes("blank")) {
      board[0][i].src = `../assets/images/${randomCandy()}.png`;
    }
  }
}

window.onload = function () {
  startGame();

  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
};
