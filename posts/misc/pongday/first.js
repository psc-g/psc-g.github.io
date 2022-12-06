// Create the canvas
function setup() {
  var first = createCanvas(400, 400);
  first.parent("firstPong");
}

// Draw the game objects
function draw() {
  background(0);
  fill(255);

  // Draw the paddles
  rect(10, mouseY - 50, 10, 100);
  rect(width - 20, height / 2 - 50, 10, 100);

  // Draw the ball
  ellipse(width / 2, height / 2, 10, 10);
}
