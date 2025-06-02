let phrase = "BATH SPA UNIVERSITY";  // The text to display
let letters = [];                    // Array to store letter data
let font;                            // Variable to hold the font
let orbs = [];                       // Array for background orb animations

function preload() {
  font = loadFont('Roboto_SemiCondensed-ExtraBoldItalic.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  colorMode(HSB); // Enable HSB for random hues
  noStroke();

  // Randomized animated letters
  for (let i = 0; i < phrase.length; i++) {
    letters.push({
      char: phrase[i],
      x: i * 40 - (phrase.length * 20) + width / 2 + random(-10, 10),
      y: height / 2 + 100 + random(-20, 20),
      targetY: height / 2,
      opacity: 0,
      floatOffset: random(1000),
      size: random(56, 72), // Random text size
      glowHue: random(180, 250), // Random glow color
      floatAmplitude: random(2, 6)
    });
  }

  // Background orbs
  for (let i = 0; i < 10; i++) {
    orbs.push({
      x: random(width),
      y: random(height),
      size: random(30, 80),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      hue: random(360)
    });
  }
}

function draw() {
  background(230, 40, 5); // Dark HSB background
  drawOrbs();
  drawText();
  drawGrain();
}

function drawText() {
  for (let l of letters) {
    if (l.y > l.targetY) l.y -= 2;
    if (l.opacity < 255) l.opacity += 4;

    push();
    translate(l.x, l.y + sin(frameCount * 0.05 + l.floatOffset) * l.floatAmplitude);
    textSize(l.size);
    fill(0, 0, 100, l.opacity); // White text in HSB
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(l.glowHue, 100, 100);
    text(l.char, 0, 0);
    pop();
  }
}

function drawOrbs() {
  for (let orb of orbs) {
    fill(orb.hue, 50, 80, 0.08);
    noStroke();
    drawingContext.shadowBlur = 40;
    drawingContext.shadowColor = color(orb.hue, 50, 80);
    ellipse(orb.x, orb.y, orb.size);
    orb.x += orb.speedX;
    orb.y += orb.speedY;
    if (orb.x < 0 || orb.x > width) orb.speedX *= -1;
    if (orb.y < 0 || orb.y > height) orb.speedY *= -1;
  }
}

function drawGrain() {
  loadPixels();
  for (let i = 0; i < 1000; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    let index = (x + y * width) * 4;
    pixels[index] = 255;
    pixels[index + 1] = 255;
    pixels[index + 2] = 255;
    pixels[index + 3] = random(10);
  }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
