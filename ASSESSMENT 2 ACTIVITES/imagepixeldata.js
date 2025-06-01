var img, x, y;

function preload() {
  img = loadImage("nature.jpg"); // loading the image before the program starts
}

function setup() {
  createCanvas(400, 400); // setting canvas size
  background(0);          // setting initial background to black
  noStroke();             // removing outlines from shapes
}

function draw() {
  background(0);          // clearing the canvas on every frame
  x = mouseX;             // getting current X position of mouse
  y = mouseY;             // getting current Y position of mouse
  image(img, 0, 0);       // displaying the image at top-left corner
  var c = get(x, y);      // getting color from the pixel at mouse position
  fill(c);                // setting fill color to the picked pixel color
  rect(x, y, 70, 70);     // drawing a rectangle with that color at mouse position
}
