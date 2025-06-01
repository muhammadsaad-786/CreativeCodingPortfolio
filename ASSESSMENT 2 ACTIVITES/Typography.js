// Declare global variables
let customFont;
let letters = [];
let colors = [];
let phrase = "BATH SPA UNIVERSITY";

function preload() {
  // Load your custom font (ensure the file is added in your editor's assets folder)
  customFont = loadFont("Roboto_SemiCondensed-ExtraBoldItalic.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Full screen responsive canvas
  textSize(60); // Set text size
  textAlign(CENTER, CENTER); // Center align text

  // Initialize each letter with position, offset, and color
  for (let i = 0; i < phrase.length; i++) {
    letters.push({
      char: phrase[i],
      x: i * 50 + width / 2 - phrase.length * 25, // Position letters centered
      y: height / 2,
      offset: random(1000), // Random offset for animation
      size: 60
    });
    colors.push(color(random(360), 100, 100)); // Random HSB color
  }

  colorMode(HSB, 360, 100, 100); // Use HSB for smoother color shifting
  noCursor(); // Hide cursor for style
}

function draw() {
  background(20); // Dark background
  drawBackgroundArt(); // Dynamic backdrop effect

  for (let i = 0; i < letters.length; i++) {
    let l = letters[i];

    push();
    textFont(customFont); // Apply custom font

    // Animate stroke color and wiggle effect
    stroke(colors[i]);
    noFill();
    strokeWeight(2 + sin(frameCount * 0.05 + i) * 2); // Pulse effect

    // Make each letter wiggle
    let wiggleX = sin(frameCount * 0.1 + l.offset) * 5;
    let wiggleY = cos(frameCount * 0.1 + l.offset) * 5;

    // Add hover effect to change color dynamically
    if (dist(mouseX, mouseY, l.x + wiggleX, l.y + wiggleY) < 30) {
      colors[i] = color(random(360), 100, 100); // Randomize color on hover
    }

    // Add glowing text shadow
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = colors[i];

    textSize(l.size + sin(frameCount * 0.1 + i) * 5); // Slight breathing effect
    text(l.char, l.x + wiggleX, l.y + wiggleY); // Draw animated letter
    pop();
  }

  // Optional: draw interactive center glow pulse
  drawCenterPulse();
}

function drawBackgroundArt() {
  noStroke();
  for (let i = 0; i < 120; i++) {
    let alpha = map(i, 0, 100, 5, 0); // Fading circles
    fill((frameCount + i * 5) % 360, 80, 80, alpha); // Color shifting fill
    ellipse(
      width / 2 + sin(i + frameCount * 0.01) * 200,
      height / 2 + cos(i * 2 + frameCount * 0.01) * 100,
      i * 2
    );
  }
}

function drawCenterPulse() {
  let pulseSize = 20 + sin(frameCount * 0.1) * 10;
  fill((frameCount * 2) % 360, 100, 100, 30); // Colorful glow
  noStroke();
  ellipse(mouseX, mouseY, pulseSize * 2); // Follows mouse
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Make it responsive
  letters = [];

  // Recalculate letter positions after resize
  for (let i = 0; i < phrase.length; i++) {
    letters.push({
      char: phrase[i],
      x: i * 50 + width / 2 - phrase.length * 25,
      y: height / 2,
      offset: random(1000),
      size: 60
    });
  }
}
