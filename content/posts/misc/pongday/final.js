// Constants for game objects
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 10;
const PADDLE_SPEED = 0.1;

// Game state variables
let leftPaddleY = 200;
let rightPaddleY = 200;
let ballX = 200;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftScore = 0;
let rightScore = 0;

let soundOn = false;

var synth = new Tone.PolySynth(6, Tone.Synth, {
	"oscillator" : {
		"partials" : [0, 2, 3, 4],
	}
}).toMaster();

function maybePlaySound(pitch, duration) {
  if (!soundOn) return;

  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  synth.triggerAttackRelease(pitch, duration);
}

// Create the canvas
function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("finalPong");
}

// Draw the game objects
// Draw the game objects
function draw() {
  background(165, 42, 42);
  fill(255);

  // Draw the paddles
  rect(10, leftPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - 20, rightPaddleY - PADDLE_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Draw the ball
  ellipse(ballX, ballY, BALL_SIZE, BALL_SIZE);

  // Move the paddles with the mouse
  leftPaddleY = mouseY;

  // Make the right paddle follow the ball
  let currSpeed = PADDLE_SPEED * (Math.random() * 2.0);
  rightPaddleY += (ballY - rightPaddleY) * currSpeed;

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check if the ball hits the left paddle
  if (ballX - BALL_SIZE / 2 < PADDLE_WIDTH &&
      ballY > leftPaddleY - PADDLE_HEIGHT / 2 &&
      ballY < leftPaddleY + PADDLE_HEIGHT / 2) {
    ballSpeedX = -ballSpeedX;
    maybePlaySound("C4", 0.3);
  }

  // Check if the ball hits the right paddle
  if (ballX + BALL_SIZE / 2 > width - PADDLE_WIDTH &&
      ballY > rightPaddleY - PADDLE_HEIGHT / 2 &&
      ballY < rightPaddleY + PADDLE_HEIGHT / 2) {
    ballSpeedX = -ballSpeedX;
    maybePlaySound("G4", 0.3);
  }

  // Check if the ball hits the top or bottom edge
  if (ballY - BALL_SIZE / 2 < 0 || ballY + BALL_SIZE / 2 > height) {
    ballSpeedY = -ballSpeedY;
    maybePlaySound("C3", 0.1);
  }

  // Check if the ball hits the left or right edge
  if (ballX < 0) {
    rightScore++;
    ballX = width / 2;
    ballY = height / 2;
  } else if (ballX > width) {
    leftScore++;
    ballX = width / 2;
    ballY = height / 2;
  }

  // Draw the score
  textSize(32);
  text(leftScore, width / 4, height / 8);
  text(rightScore, 3 * width / 4, height / 8);
}

// Move the right paddle with the up and down arrow keys
function triggerSound() {
  soundOn = !soundOn;
  if (!soundOn) {
    document.getElementById("soundButton").textContent = "Sound Off";
    return;
  }

  document.getElementById("soundButton").textContent = "Sound On";
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
}
