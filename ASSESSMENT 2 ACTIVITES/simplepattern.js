let gridSize = 60; // Size of each grid cell
let t = 0; // Time variable for animation
let stars = []; // Array to hold background stars

function setup() {
  createCanvas(600, 600); // Set canvas size
  noStroke(); // No outlines for shapes
  frameRate(30); // Smooth animation
  colorMode(HSB, 360, 100, 100, 100); // Use HSB for color blending

  // Create 100 twinkling stars with random positions and brightness
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      b: random(30, 100)
    });
  }
}

function draw() {
  background(240, 30, 10, 5); // Dark background with low alpha for trails

  // Draw twinkling stars in the background
  for (let s of stars) {
    fill(0, 0, 100, random(10, 40)); // Bright white-ish flickering stars
    ellipse(s.x, s.y, 2, 2); // Tiny star dots
  }

  // Loop through grid cells
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {

      let centerX = x + gridSize / 2;
      let centerY = y + gridSize / 2;

      // Distance from mouse to cell center
      let d = dist(mouseX, mouseY, centerX, centerY);

      // Use distance to modify pulse (reacts to mouse)
      let pulse = sin(t - d * 0.05) * 10 + 20;

      // Calculate a hue that changes over time and space
      let hue = (t * 10 + x + y) % 360;

      // Random flicker effect using Perlin noise
      let flicker = noise(x * 0.1, y * 0.1, t) * 100;

      // Choose fill style based on flicker and position
      if (flicker > 95) {
        fill(hue, 100, 100, 100); // Sudden bright flicker
      } else if ((x + y + int(t * 10)) % 100 < 50) {
        fill(hue, 100, 100, 70); // Normal bright cell
      } else {
        fill(hue, 60, 80, 30); // Dimmer alternate glow
      }

      // Layered glow effect (3 outer rings)
      for (let g = 3; g > 0; g--) {
        fill(hue, 100, 100, 10 * g); // Faint colored glow layers
        ellipse(centerX, centerY, pulse + g * 10);
      }

      // Main solid pulsing circle
      fill(hue, 100, 100);
      ellipse(centerX, centerY, pulse);
    }
  }

  t += 0.03; // Update time to animate
}
