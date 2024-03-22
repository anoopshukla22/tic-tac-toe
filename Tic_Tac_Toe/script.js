let currentPlayer = 'X';
let cells = Array.from(document.querySelectorAll('.board td'));
let message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],  
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function displayMessage(msg) {
  message.textContent = msg;
}

function playMove(index) {
  if (cells[index].textContent === '' && !checkWinner() && !checkDraw()) {
    cells[index].textContent = currentPlayer;
    if (checkWinner()) {
      displayMessage(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
      displayMessage("It's a draw!");
    } else {
      switchPlayer();
      displayMessage(`Player ${currentPlayer}'s turn`);
    }
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  displayMessage(`Player ${currentPlayer}'s turn`);
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => playMove(index));
});

resetBtn.addEventListener('click', resetGame);

displayMessage(`Player ${currentPlayer}'s turn`);

