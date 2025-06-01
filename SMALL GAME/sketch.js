let font1; // Optional font variable (not used here)
let gameState = "start"; // Current game state
let pointsP1 = 0; // Score for Player 1
let pointsP2 = 0; // Score for Player 2

// Falling objects and their velocities
let object1, object2, object3, object4;
let vel1, vel2, vel3, vel4;

// Player variables
let player1, player2;

// Array for background stars
let stars = [];

function setup() {
  createCanvas(800, 500); // Set up the game window
  resetGame(); // Initialize/reset game values

  // Create starfield for background
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width), // Random horizontal position
      y: random(height), // Random vertical position
      size: random(1, 3), // Random star size
      speed: random(0.2, 1) // Star movement speed
    });
  }
}

function draw() {
  drawGalaxyBackground(); // Draw animated space background

  // Handle different game states
  if (gameState === "start") {
    showStartScreen(); // Show welcome screen
  } else if (gameState === "play") {
    playGame(); // Run gameplay
  } else if (gameState === "gameOver") {
    showGameOver(); // Show game over screen
  }
}

function drawGalaxyBackground() {
  background(10); // Dark sky background

  noStroke();
  fill(255); // White stars
  for (let star of stars) {
    circle(star.x, star.y, star.size); // Draw each star
    star.y += star.speed; // Move star down

    // Reset star to top when it moves off screen
    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }
  }
}

function showStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(42);
  text("ULTIMATE FALLING OBJECTS", width / 2, height / 2 - 40); // Title
  textSize(20);
  text("Player 1: Mouse | Player 2: Arrow Keys", width / 2, height / 2 + 10); // Controls
  text("Click anywhere to start!", width / 2, height / 2 + 60); // Instruction
}

function playGame() {
  // Player 1 follows mouse horizontally
  player1 = createVector(mouseX, height - 25);
  fill(100, 255, 150); // Green color
  rectMode(CENTER);
  rect(player1.x, player1.y, 40, 20); // Draw Player 1

  // Player 2 movement using arrow keys
  if (keyIsDown(LEFT_ARROW)) player2.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player2.x += 5;
  player2.x = constrain(player2.x, 20, width - 20); // Keep inside canvas
  fill(200, 100, 255); // Purple color
  rect(player2.x, player2.y, 40, 20); // Draw Player 2

  // Draw falling objects for each player
  drawObject(object1, vel1, 'star', player1, 'P1');
  drawObject(object2, vel2, 'triangle', player1, 'P1');
  drawObject(object3, vel3, 'circle', player2, 'P2');
  drawObject(object4, vel4, 'square', player2, 'P2');

  // Show scores
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("P1 Score: " + pointsP1, 20, 30);
  textAlign(RIGHT);
  text("P2 Score: " + pointsP2, width - 20, 30);

  // Check if any object hits the ground
  if (object1.y > height || object2.y > height || object3.y > height || object4.y > height) {
    gameState = "gameOver"; // Switch to Game Over
  }
}

function drawObject(obj, vel, shape, player, playerTag) {
  obj.add(vel); // Move the object down

  push(); // Save current style settings
  translate(obj.x, obj.y); // Set origin to object position

  // Draw different shapes
  noStroke();
  if (shape === 'circle') {
    fill(255, 100, 100); // Red
    ellipse(0, 0, 30);
  } else if (shape === 'square') {
    fill(50, 150, 255); // Blue
    rectMode(CENTER);
    rect(0, 0, 25, 25);
  } else if (shape === 'triangle') {
    fill(255, 165, 0); // Orange
    triangle(-12, 10, 0, -15, 12, 10);
  } else if (shape === 'star') {
    fill(255, 255, 0); // Yellow
    star(0, 0, 8, 20, 5); // Custom star shape
  }
  pop(); // Restore original styles

  // Check for collision with player
  let d = dist(obj.x, obj.y, player.x, player.y);
  if (d < 30) { // If close enough to catch
    obj.y = -random(40, 100); // Reset object to top
    obj.x = random(30, width - 30);
    vel.y += 0.1; // Increase speed

    // Award points to the correct player
    if (playerTag === 'P1') pointsP1++;
    else pointsP2++;
  }
}

// Custom function to draw a star shape
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function showGameOver() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(38);
  text("Game Over!", width / 2, height / 2 - 60);
  textSize(22);
  text("Final Score — P1: " + pointsP1 + " | P2: " + pointsP2, width / 2, height / 2); // Final score
  text("Click to restart", width / 2, height / 2 + 60); // Restart instruction
}

function mousePressed() {
  if (gameState === "start" || gameState === "gameOver") {
    resetGame(); // Restart game values
    gameState = "play"; // Start the game
  }
}

function resetGame() {
  // Set new random positions for falling objects
  object1 = createVector(random(30, width - 30), -30);
  object2 = createVector(random(30, width - 30), -100);
  object3 = createVector(random(30, width - 30), -60);
  object4 = createVector(random(30, width - 30), -150);

  // Set falling speeds
  vel1 = createVector(0, 1.2);
  vel2 = createVector(0, 1.6);
  vel3 = createVector(0, 1.4);
  vel4 = createVector(0, 1.8);

  // Initialize Player 2 position
  player2 = createVector(width / 2, height - 60);

  // Reset scores
  pointsP1 = 0;
  pointsP2 = 0;
}
