let img;
let angle = 0; // Angle for rotation
let direction = 1; // Direction of rotation

function preload() {
  img = loadImage('ocean.jpg'); // Loading image before setup
}

function setup() {
  createCanvas(700, 700); // Canvas size
  img.resize(200, 200); // Resizing image
}

function draw() {
  background(190, 220, 250); // Light blue background

  // Create a graphics buffer (off-screen)
  let cnv7 = createGraphics(200, 200);

  cnv7.clear(); // Clear previous drawings on buffer
  cnv7.triangle(0, 0, 100, 200, 200, 0); // Draw triangle shape
  cnv7.canvas.getContext("2d").clip(); // Clip everything outside triangle
  cnv7.image(img, 0, 0); // Draw image inside the triangle

  // Move to the center and apply rotation
  push(); // Save current drawing state
  translate(width / 2, height / 2); // Move to canvas center
  rotate(radians(angle)); // Rotate by angle
  imageMode(CENTER); // Center the image when drawing
  image(cnv7, 0, 0); // Draw the triangle image
  pop(); // Restore drawing state

  // Increase or decrease the angle for rotation
  angle += 0.5 * direction; // Rotate continuously

  // Reverse direction when mouse is pressed
  if (mouseIsPressed) {
    direction = -1;
  } else {
    direction = 1;
  }
}
