let carX = 250; // Where the car starts on screen
let isNight = false; // For switching between day and night
let carColors = ["#243B7A", "#800000", "#228B22", "#5D3FD3"]; // Different car colors to change through
let currentCarColor = 0; // To know which color is currently active
let clouds = []; // Storing all moving clouds here
let smoke = []; // Keeping the exhaust smoke particles here

function setup() {
  createCanvas(500, 400); // Creating Canvas size
  frameRate(60); // Setting the frame rate to 60 for smooth animations

  // Creating 5 random clouds
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(50, 150),
      size: random(40, 80)  //Choosing size of clouds
    });
  }
}

function draw() {
  drawSky(); // Drawing the sky gradient
  drawSunOrMoon(); // Adding the sun or moon
  drawMountains(); // Adding mountains in background
  drawClouds(); // Adding clouds top of mountains
  drawRoad(); // Setting road at the bottom
  drawCar(); // Drawing customized car here
  updateAndDrawSmoke(); // Exhaust smoke puffing out from car

  // Adding mouse interactivity for the car to follow
  let targetX = mouseX - 250;
  carX += (targetX - carX) * 0.08;
}

function drawSky() {
  // Changing sky color depending on the mode
  if (isNight) {
    setGradient(0, 0, width, 300, color('#2C3E50'), color('#1C2833')); // Dark for night
  } else {
    setGradient(0, 0, width, 300, color('#FDEBD0'), color('#F5CBA7')); // Bright for day
  }
}

function drawSunOrMoon() {
  noStroke();
  if (isNight) {
    fill('#F0F8FF'); // Light blue moon
    ellipse(80, 80, 40, 40); // Moon position and size
  } else {
    fill('#FDB813'); // Orange sun
    ellipse(80, 80, 60, 60); // Sun position and size
  }
}

function drawMountains() {
  let mountainColor = isNight ? "#2E4053" : "#AAB7B8"; // Mountains look darker at night
  fill(mountainColor);
  noStroke();
  // Drawing three mountains
  triangle(0, 300, 100, 180, 200, 300);
  triangle(150, 300, 250, 160, 350, 300);
  triangle(300, 300, 420, 200, 500, 300);
}

function drawClouds() {
  let cloudColor = isNight ? "#B0C4DE" : "#FFFFFF"; // Light gray at night, white in day
  fill(cloudColor);
  noStroke();

  for (let c of clouds) {
    // Drawing each cloud using three ellipses
    ellipse(c.x, c.y, c.size, c.size * 0.6);
    ellipse(c.x + 20, c.y + 5, c.size * 0.7, c.size * 0.5);
    ellipse(c.x - 20, c.y + 5, c.size * 0.7, c.size * 0.5);

    // Moving the clouds across sky
    c.x += 0.3;
    if (c.x > width + 50) c.x = -50; // When offscreen, send them back
  }
}

function drawRoad() {
  fill("#2F2F2F"); // Dark road
  rect(0, 300, width, 100); // Drawing the road

  for (let i = 0; i < width; i += 80) {
    fill(isNight ? "#FFFFAA" : "#FFFACD"); // road lane markers
    rect(i + 20, 330, 40, 8, 2);
  }
}

function drawCar() {
  // Main car body
  fill(carColors[currentCarColor]);
  rect(80 + carX, 250, 370, 70, 10);

  // Top roof strip
  fill("#CFCBC4");
  rect(90 + carX, 320, 350, 6);

  // Windows
  fill("#D6F1FF");
  rect(170 + carX, 200, 140, 50, 10); // Center window
  fill("#C9EFFF");
  triangle(170 + carX, 200, 110 + carX, 250, 170 + carX, 250); // Left front window
  triangle(310 + carX, 200, 410 + carX, 250, 310 + carX, 250); // Right back window

  // Door line in the center
  stroke("#BBBBBB");
  strokeWeight(2);
  line(240 + carX, 200, 240 + carX, 250);
  noStroke();

  // Headlights
  fill(isNight ? "#FFD700" : "#FFE066");
  ellipse(80 + carX, 260, 10, 20);
  fill(isNight ? "#FFFACD" : "#FFFDD0");
  ellipse(80 + carX, 275, 10, 10);

  // Tail light
  fill("#FF6666");
  rect(445 + carX, 260, 10, 25, 5);

  // Wheels
  fill("#1E1E1E"); // Black tires
  ellipse(150 + carX, 320, 60, 60);
  ellipse(380 + carX, 320, 60, 60);

  // Rims
  fill("#CCCCCC");
  ellipse(150 + carX, 320, 30, 30);
  ellipse(380 + carX, 320, 30, 30);

  // Wheel nuts
  fill("#666666");
  ellipse(150 + carX, 320, 5, 5);
  ellipse(380 + carX, 320, 5, 5);
}

function updateAndDrawSmoke() {
  // Adding new smoke puff every few frames
  if (frameCount % 5 === 0) {
    smoke.push({
      x: 80 + carX - 10,
      y: 280,
      size: random(8, 15),
      opacity: 255
    });
  }

  for (let i = smoke.length - 1; i >= 0; i--) {
    let s = smoke[i];

    fill(150, 150, 150, s.opacity); // Light gray smoke
    noStroke();
    ellipse(s.x, s.y, s.size); // Smoke puff

    // Making it rise, drift, and fade
    s.y -= 0.5;
    s.x -= 0.2;
    s.size += 0.1;
    s.opacity -= 3;

    if (s.opacity <= 0) {
      smoke.splice(i, 1); // Removing when invisible
    }
  }
}

// Function to create a vertical gradient
function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1); // Blending value
    let c = lerpColor(c1, c2, inter); // Gradual color mix
    stroke(c);
    line(x, i, x + w, i); // Horizontal line across the width
  }
}

// Adding key controls to toggle night and car color
function keyPressed() {
  if (key === 'n' || key === 'N') {
    isNight = !isNight; // Toggle day/night
  } else if (key === 'c' || key === 'C') {
    currentCarColor = (currentCarColor + 1) % carColors.length; // Change car color
  }
}
