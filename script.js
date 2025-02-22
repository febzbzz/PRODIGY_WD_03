const board = document.getElementById("board");
const message = document.getElementById("message");
const winnerMessage = document.getElementById("winnerMessage");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    winnerMessage.style.display = "none";
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (gameState[index] === "" && !checkWinner()) {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWinner()) {
            winnerMessage.textContent = `🎉 Congratulations! Player ${currentPlayer} Wins! 🎉`;
            winnerMessage.style.display = "block";
            winnerMessage.className = "winner-message";
            return;
        }

        if (gameState.every(cell => cell !== "")) {
            winnerMessage.textContent = "😲 Oops! It's a draw! Restart the game.";
            winnerMessage.style.display = "block";
            winnerMessage.className = "winner-message draw-message"; 
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    message.textContent = "Player X's Turn";
    createBoard();
}

createBoard();
