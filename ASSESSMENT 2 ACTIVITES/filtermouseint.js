let img;

function preload() {
  img = loadImage("gow.webp");
}

function setup() {
  createCanvas(400, 400); // Create a canvas of 400x400 pixels
  background(0); // Set initial background to black
}

function draw() {
  background(0); // Clear the canvas on each frame

  image(img, 0, 0, width, height); // Draw the image stretched to canvas size

  let v = map(mouseX, 0, width, 0, 1); // Map mouseX to a value between 0 and 1

  filter(THRESHOLD, v); // Apply THRESHOLD filter with intensity based on mouseX
}
