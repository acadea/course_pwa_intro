const board = [["", "", ""],
["", "", ""],
["", "", ""]
];

const players = ["X", "O"];

let currentPlayer = 0;

const getRowCol = function (position) {
  const row = Math.floor(position / 3);
  const col = position % 3;
  return [row, col];
};

const makeMove = function (position) {
  const [row, col] = getRowCol(position);
  if (board[row][col] === "") {
    board[row][col] = players[currentPlayer];
    // document.getElementById(position).textContent = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % 2;
    return true;
  } else {
    console.log("That space is already occupied!");
    return false;
  }
};

const checkWin = function () {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
    return true;
  }
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== "") {
    return true;
  }

  return false;
};

self.onmessage = function(event){

  console.log(event.data);

  if(event.data.type === 'move'){

    const position = event.data.position;

    const player = players[currentPlayer];

    
    const moved = makeMove(Number(position));

    if(!moved){
      return self.postMessage({
        type: 'invalid',
        message: 'Spot is already taken',
      })
    }
    if (checkWin()) {
      return self.postMessage({
        type: 'gameOver',
        payload: {
          position,
          player,
        }
      })
    }

    self.postMessage({
      type: 'update',
      payload: {
        position,
        player,
      }
    })

  }
}