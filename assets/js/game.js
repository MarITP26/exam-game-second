const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// IMÁGENES
const ballImg = new Image();
ballImg.src = "./assets/img/balon_fut.png" ;

const messiImg = new Image();
messiImg.src = "./assets/img/messi_arg.png";

// VARIABLES
let x = canvas.width / 2;
let y = canvas.height - 60;
let dx = 3;
let dy = -3;

let paddleWidth = 100;
let paddleHeight = 20;
let paddleX = canvas.width / 2 - paddleWidth / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = highScore;

let level = 1;

// BLOQUES
let brickRowCount = 3;
let brickColumnCount = 5;
let bricks = [];

function initBricks() {
  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

initBricks();

// CONTROLES
document.addEventListener("keydown", e => {
  if (e.key === "Right") rightPressed = true;
  if (e.key === "Left") leftPressed = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "Right") rightPressed = false;
  if (e.key === "Left") leftPressed = false;
});

// COLISIONES
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + 75 && y > b.y && y < b.y + 20) {
          dy = -dy;
          b.status = 0;
          score += 10;

          document.getElementById("score").innerText = score;

          if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").innerText = highScore;
          }

          if (checkLevelComplete()) nextLevel();
        }
      }
    }
  }
}

function checkLevelComplete() {
  return bricks.flat().every(b => b.status === 0);
}

// SIGUIENTE NIVEL
function nextLevel() {
  if (level < 10) {
    level++;
    document.getElementById("level").innerText = level;
    document.getElementById("message").innerText = "🎉 ¡Felicidades! Nivel superado";

    dx += 0.5;
    dy -= 0.5;
    brickRowCount++;

    initBricks();

    setTimeout(() => {
      document.getElementById("message").innerText = "";
    }, 2000);
  } else {
    document.getElementById("message").innerText = "🏆 ¡Ganaste la Copa del Mundo!";
  }
}

// DIBUJOS
function drawBall() {
  ctx.drawImage(ballImg, x - 10, y - 10, 20, 20);
}

function drawPaddle() {
  ctx.drawImage(messiImg, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * 80 + 30;
        let brickY = r * 30 + 30;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.fillStyle = "#ffcc00";
        ctx.fillRect(brickX, brickY, 75, 20);
      }
    }
  }
}

// LOOP
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  // REBOTES
  if (x + dx > canvas.width || x + dx < 0) dx = -dx;
  if (y + dy < 0) dy = -dy;

  // GAME OVER
  if (y + dy > canvas.height) {
    document.location.reload();
  }

  x += dx;
  y += dy;

  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 6;
  if (leftPressed && paddleX > 0) paddleX -= 6;

  requestAnimationFrame(draw);
}

draw();