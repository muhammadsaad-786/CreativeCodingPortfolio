let blink = 0.3;            // Starting point for blinking
let blinkSpeed = 0.05;      // Speed of blinking
let antennaWobble = 0;      // Controls antenna movement
let bodyBob = 0;            // Controls up/down movement
let stars = [];             // Array to hold star positions

function setup() {
  createCanvas(400, 400);         // Setting canvas size
  angleMode(DEGREES);             // Using degrees for rotation

  // Creating random stars in the background
  for (let i = 0; i < 80; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.1, 0.5),
      brightness: random(100, 255)
    });
  }
}

function draw() {
  background(10, 10, 30);        // Dark space background

  drawStars();                   // Drawing twinkling stars

  // Bobbing the alien up/down
  translate(width / 2, height / 2 + sin(bodyBob) * 5);
  scale(1.2); // Slightly scaling up the alien
  bodyBob += 0.5; // Updating bob position

  push();

  // Alien Head (color same as body now)
  fill(100, 255, 180);           // Matching body color
  stroke(50, 200, 150);          // Dark green outline
  strokeWeight(3);
  beginShape();
  bezierVertex(-50, -80, -80, 20, -50, 80);
  bezierVertex(-20, 120, 20, 120, 50, 80);
  bezierVertex(80, 20, 50, -80, 0, -90);
  bezierVertex(-50, -80, -50, -80, -50, -80);
  endShape(CLOSE);

  // Eyes - glow circle
  fill(255, 255, 255, 30);       // Soft glow
  noStroke();
  ellipse(0, -15, 125, 125);

  // Eyes - blinking pupils
  fill(0);
  let blinkSize = map(sin(blink), -1, 1, 20, 50); // Controlled size range
  ellipse(-20, -20, 30, blinkSize);               // Left eye
  ellipse(20, -20, 30, blinkSize);                // Right eye

  // Eyes - white shine
  fill(255);
  ellipse(-15, -30, 10, 15);
  ellipse(25, -30, 10, 15);

  blink += blinkSpeed; // Updating blink animation

  // Antennas - animated wobble
  stroke(50, 200, 150);
  strokeWeight(3);
  let wobbleX = sin(antennaWobble) * 5; // Left-right movement
  line(-25, -90, -35 + wobbleX, -120);  // Left antenna
  line(25, -90, 35 - wobbleX, -120);    // Right antenna
  fill(255, 100, 150); // Pink tips
  ellipse(-35 + wobbleX, -120, 10, 10);
  ellipse(35 - wobbleX, -120, 10, 10);
  antennaWobble += 2; // Animate wobble

  // Body
  fill(100, 255, 180);
  stroke(50, 200, 150);
  ellipse(0, 100, 60, 80); // Oval body

  // Legs
  strokeWeight(5);
  line(-15, 140, -20, 180);
  line(15, 140, 20, 180);

  // Arms
  strokeWeight(4);
  line(-40, 100, -70, 120);
  line(40, 100, 70, 120);

  pop();
}

// Drawing moving stars in background
function drawStars() {
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    fill(s.brightness);        // White to gray stars
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;            // Move star downward
    if (s.y > height) {
      s.y = 0;                 // Reset to top
      s.x = random(width);     // Random x again
    }
  }
}
