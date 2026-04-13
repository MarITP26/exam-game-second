const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// IMÁGENES
const ballImg = new Image();
ballImg.src = "./assets/img/balon_fut.png";

const messiImg = new Image();
messiImg.src = "./assets/img/messi_arg.png";

// VARIABLES
let gameStarted = false;

let x = canvas.width / 2;
let y = canvas.height - 60;
let dx = 3;
let dy = -3;

let paddleWidth = 100;
let paddleHeight = 20;
let paddleX = canvas.width / 2 - paddleWidth / 2;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerText = highScore;

let level = 1;
document.getElementById("level").innerText = level;

// VIDAS
let lives = 3;
document.getElementById("lives").innerText = lives;

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

// BOTÓN START
document.getElementById("startBtn").addEventListener("click", () => {
  gameStarted = true;
});

// CONTROL CON MOUSE
canvas.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  paddleX = mouseX - paddleWidth / 2;

  if (paddleX < 0) paddleX = 0;
  if (paddleX > canvas.width - paddleWidth) {
    paddleX = canvas.width - paddleWidth;
  }
});

// COLISIONES CON BLOQUES
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

          // VERIFICAR SI TERMINÓ EL NIVEL
          if (checkLevelComplete()) {
            nextLevel();
          }
        }
      }
    }
  }
}

// VERIFICAR NIVEL COMPLETO (CORRECTO)
function checkLevelComplete() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        return false;
      }
    }
  }
  return true;
}

// SIGUIENTE NIVEL
function nextLevel() {
  if (level < 10) {
    level++;

    document.getElementById("level").innerText = level;
    document.getElementById("message").innerText = "🎉 ¡Felicidades! Nivel superado";

    // Aumentar dificultad
    dx += 0.5;
    dy = -(Math.abs(dy) + 0.5);
    brickRowCount++;

    // Reiniciar pelota
    x = canvas.width / 2;
    y = canvas.height - 60;

    // Reiniciar bloques
    initBricks();

    setTimeout(() => {
      document.getElementById("message").innerText = "";
    }, 2000);

  } else {
    document.getElementById("message").innerText = "🏆 ¡Ganaste la Copa del Mundo!";
    gameStarted = false;
  }
}

// DIBUJOS
function drawBall() {
  ctx.drawImage(ballImg, x - 10, y - 10, 20, 20);
}

function drawPaddle() {
  ctx.drawImage(
    messiImg,
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
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

// LOOP PRINCIPAL
function draw() {
  if (!gameStarted) {
    requestAnimationFrame(draw);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  // REBOTES PAREDES
  if (x + dx > canvas.width || x + dx < 0) dx = -dx;
  if (y + dy < 0) dy = -dy;

  // COLISIÓN CON MESSI
  if (
    y + dy > canvas.height - paddleHeight &&
    x > paddleX &&
    x < paddleX + paddleWidth
  ) {
    dy = -dy;

    let hitPoint = x - (paddleX + paddleWidth / 2);
    dx = hitPoint * 0.1;
  }

  // PIERDE VIDA
  else if (y + dy > canvas.height) {
    lives--;
    document.getElementById("lives").innerText = lives;

    if (lives <= 0) {
      document.getElementById("message").innerText = "💀 Game Over";
      gameStarted = false;
      return;
    }

    // Reiniciar pelota
    x = canvas.width / 2;
    y = canvas.height - 60;
    dx = 3;
    dy = -3;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();