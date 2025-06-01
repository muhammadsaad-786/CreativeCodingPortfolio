let trail = [];

function setup() {
  createCanvas(800, 600);                   // set the size of the canvas
  colorMode(HSB, 360, 100, 100, 100);       // use HSB color mode for smooth color changes
  textFont('Courier New');                  // set a techno-style font
  textAlign(CENTER, CENTER);                // center-align text
  noCursor();                               // hide the default mouse cursor
}

function draw() {
  background(0, 0, 0, 10);                  // draw a semi-transparent background for trail effect

  let hue = (frameCount * 2) % 360;         // cycle through colors smoothly

  // store current mouse position and style in the trail array
  trail.push({
    x: mouseX,                              // x position of mouse
    y: mouseY,                              // y position of mouse
    size: random(10, 25),                   // random size for each character
    hue: hue,                               // color hue based on frame count
    angle: frameCount,                      // rotation angle
    char: random(['A','X','★','Z','∞','M','!','@','☯','∆','R']), // random symbol
    offset: random(-10, 10)                 // random offset for line effect
  });

  if (trail.length > 50) {
    trail.shift();                          // remove oldest trail element to limit total
  }

  // loop through all trail elements
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    let alpha = map(i, 0, trail.length, 0, 100); // set transparency based on position in trail

    push();
    translate(t.x, t.y);                    // move origin to trail position
    rotate(radians(t.angle % 360));        // rotate each character

    // draw a glowing circle behind character
    fill(t.hue, 100, 100, alpha / 2);
    ellipse(0, 0, t.size * 2);

    // draw sparkle line effect
    stroke(t.hue, 100, 100, 30);
    strokeWeight(1);
    line(0, 0, t.offset * 5, t.offset * 5);
    noStroke();

    // draw the character
    fill(t.hue, 100, 100, alpha);
    textSize(t.size);
    text(t.char, 0, 0);
    pop();
  }

  // optional glowing dot at the cursor
  fill(hue, 100, 100, 40);
  ellipse(mouseX, mouseY, 8);
}
