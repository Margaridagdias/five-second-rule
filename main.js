// main.js
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const timer = document.getElementById("timer");
let fiveSeconds = 5;
let intervalId;
let isRunning = false;

// GRID Calculations

const width = canvas.width;
const height = canvas.height;
const tileCount = 6;
const tileSize = width / tileCount;
const squares = [];
const colors = [
  "#66cdaa",
  "#ff6b6b",
  "#e27fa0",
  "#ddf5f9",
  "#1f4c25",
  "#ff7e00",
  "#ffa3dd",
  "#99f4f2",
  "#b4a097",
  "#eaea32",
  "	#15b4a3",
  "	#ff0080",
];
let firstRandomSquare;
let score = 0;
highScore();

// Iteration 1

function drawGrid() {
  context.lineWidth = 2;

  for (let i = 0; i < tileCount; i++) {
    for (let j = 0; j < tileCount; j++) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      let randomColor = colors[randomIndex];

      context.fillStyle = randomColor;
      context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize, colors);
      //   console.log('drawing position x ', j * tileSize, 'position y', i * tileSize,);
      squares.push({ x: j * tileSize, y: i * tileSize }); //inserimos 36 quadrados ({x: y:})
    }
  }
}

function paintTwoRandomSquares() {
  let randomIndex = Math.floor(Math.random() * squares.length);
  firstRandomSquare = squares[randomIndex];
  //     console.log('firstRandomSquare: => ', firstRandomSquare);
  context.fillStyle = "black";
  context.fillRect(
    firstRandomSquare.x,
    firstRandomSquare.y,
    tileSize,
    tileSize
  );
  //Obter x e y de firstRandomSquare e fazer fillRect(x, y, width, height)
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const clickedX = event.clientX - rect.left;
  const clickedY = event.clientY - rect.top;

  if (
    !(
      clickedY > firstRandomSquare.y + tileSize ||
      clickedY < firstRandomSquare.y ||
      clickedX > firstRandomSquare.x + tileSize ||
      clickedX < firstRandomSquare.x
    )
  ) {
    {
      if (isRunning) {
        score += 1;
      }
    }

    document.getElementById("scoreTotal").innerText = score;
  }
}

canvas.addEventListener("mousedown", function (e) {
  getCursorPosition(canvas, e);
});

// Draw Everything
function drawEverything() {
  context.clearRect(0, 0, width, height);
  drawGrid();
  setTimeout(() => {
    paintTwoRandomSquares();
  }, 200);
}

// Triggering the first drawEverything after 500ms ensures that all pictures had been loaded
drawEverything();

function startGame() {
  isRunning = true;
  intervalId = setInterval(() => {
    drawEverything(); //VAI SER EXECUTADO DE 500 MILISEGUNDOS EM 500 MILISEGUNDOS
  }, 700);
}
startGame();

//TIME

function decreaseTime(fiveSeconds) {
  const interval = setInterval(() => {
    fiveSeconds--;

    if (fiveSeconds <= 0) {
      clearInterval(interval);
      clearInterval(intervalId);

      //fiveSeconds = `Times's up!`
      let restartButton = document.getElementById("restart");
      restartButton.style.display = "block";
      isRunning = false;
      highScore();
    }
    console.log(fiveSeconds);
    timer.innerHTML = fiveSeconds > 0 ? fiveSeconds : "Time's up!";
  }, 1000);
}

decreaseTime(fiveSeconds);

document.getElementById("restart").onclick = () => {
  // console.log('restarting')

  score = 0;
  document.getElementById("scoreTotal").innerText = score;
  fiveSeconds = 5;
  drawEverything();
  decreaseTime(fiveSeconds);

  startGame();
  // document.getElementById('scoreTotal').innerHTML = "0";
};

function highScore() {
  let currentScore = score;

  let highScore = localStorage.getItem("HighScore");

  if (currentScore > highScore) {
    localStorage.HighScore = currentScore;
  }

  let newHighScore = localStorage.getItem("HighScore");
  console.log(newHighScore);
  document.getElementById("high-score").innerHTML = newHighScore;
}
