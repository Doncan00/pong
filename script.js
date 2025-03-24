let ball;
let leftPaddle, rightPaddle;
let leftScore = 0, rightScore = 0;
const WINNING_SCORE = 5;

function setup() {
  createCanvas(800, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  drawScores();
  ball.update();
  ball.checkCollision(leftPaddle, rightPaddle);
  leftPaddle.update();
  rightPaddle.update();
  ball.show();
  leftPaddle.show();
  rightPaddle.show();
  checkWin();
}

function drawScores() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(leftScore, width / 4, 50);
  text(rightScore, (3 * width) / 4, 50);
}

function checkWin() {
  if (leftScore >= WINNING_SCORE) {
    noLoop();
    alert("¡Jugador 1 gana!");
  } else if (rightScore >= WINNING_SCORE) {
    noLoop();
    alert("¡Jugador 2 gana!");
  }
}

function keyPressed() {
  if (keyCode === 87) leftPaddle.move(-10); // 'W'
  if (keyCode === 83) leftPaddle.move(10);  // 'S'
  if (keyCode === UP_ARROW) rightPaddle.move(-10);
  if (keyCode === DOWN_ARROW) rightPaddle.move(10);
}

function keyReleased() {
  if (keyCode === 87 || keyCode === 83) leftPaddle.move(0);
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) rightPaddle.move(0);
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random([-4, 4]);
    this.vy = random([-3, 3]);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y <= 0 || this.y >= height) this.vy *= -1;
    if (this.x <= 0) { rightScore++; this.reset(); }
    if (this.x >= width) { leftScore++; this.reset(); }
  }

  checkCollision(paddle1, paddle2) {
    if (
      this.x - 10 <= paddle1.x + paddle1.w &&
      this.y >= paddle1.y && this.y <= paddle1.y + paddle1.h
    ) {
      this.vx *= -1.1;
    }
    if (
      this.x + 10 >= paddle2.x &&
      this.y >= paddle2.y && this.y <= paddle2.y + paddle2.h
    ) {
      this.vx *= -1.1;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, 20, 20);
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.x = isLeft ? 10 : width - 20;
    this.y = height / 2 - this.h / 2;
    this.speed = 0;
  }

  update() {
    this.y += this.speed;
    this.y = constrain(this.y, 0, height - this.h);
  }

  move(speed) {
    this.speed = speed;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
