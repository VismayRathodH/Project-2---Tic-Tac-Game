const board = document.querySelectorAll(".cell");
const message = document.getElementById("message");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
];

// Function to handle clicks
board.forEach(cell => {
    cell.addEventListener("click", function() {
        const index = this.dataset.index;

        if (gameState[index] || !gameActive) return;

        gameState[index] = currentPlayer;
        this.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} Wins! 🎉`;
            gameActive = false;
            return;
        }

        if (!gameState.includes(null)) {
            message.textContent = "It's a Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
});

// Function to check winner
function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === currentPlayer);
    });
}

// Function to reset the game
function resetGame() {
    gameState.fill(null);
    board.forEach(cell => cell.textContent = "");
    message.textContent = "";
    gameActive = true;
    currentPlayer = "X";
}
