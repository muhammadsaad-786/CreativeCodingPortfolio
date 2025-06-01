var img, x, y;

function preload() {
  img = loadImage("lewis.webp"); // loading the image before the program starts
}

function setup() {
  createCanvas(976, 549); // setting the canvas size
  background(0);          // setting background to black
  noStroke();             // removing outlines from shapes
}

function draw() {
  x = random(width);      // getting a random x position within canvas
  y = random(height);     // getting a random y position within canvas

  var c = img.get(x, y);  // getting the color of the pixel from the image at (x, y)

  fill(c[0], c[1], c[2], 20); // setting fill color using red, green, blue, and opacity

  rect(x, y, 25, 25);     // drawing a semi-transparent rectangle at (x, y)
}
