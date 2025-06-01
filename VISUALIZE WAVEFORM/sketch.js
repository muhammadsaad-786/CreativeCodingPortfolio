let sound;
let analyzer;
let loaded = false;

function setup() {
  createCanvas(600, 600); // Create canvas
  angleMode(RADIANS); // Use radians for angles
  colorMode(HSB, 360, 100, 100); // Enable HSB for vibrant colors

  // Create the waveform analyzer
  analyzer = new Tone.Waveform(1024);

  // Load the audio file
  sound = new Tone.Player("sound/no-copyright-music-corporate-background-338031.mp3", () => {
    sound.connect(analyzer);     // Connect sound to analyzer
    sound.toDestination();       // Send sound to speakers
    loaded = true;               // Mark sound as loaded
    console.log("Audio loaded!");
  });
}

function draw() {
  // --- Glow Trail Effect ---
  noStroke();
  fill(230, 30, 20, 0.08 * 255); // Transparent reddish overlay
  rect(0, 0, width, height);     // Semi-clear background each frame

  if (loaded) {
    let waveform = analyzer.getValue(); // Get audio waveform
    let avgAmp = waveform.reduce((a, b) => a + Math.abs(b), 0) / waveform.length;
    let pulse = map(avgAmp, 0, 1, 1, 1.3); // Scale pulse based on volume

    translate(width / 2, height / 2); // Center origin
    noFill();
    strokeWeight(2);

    beginShape();
    let step = floor(waveform.length / 100); // Reduce point count

    for (let i = 0; i < waveform.length; i += step) {
      let angle = map(i, 0, waveform.length, 0, TWO_PI); // Spread around circle
      let radius = map(waveform[i], -1, 1, 100, width / 2) * pulse;

      let x = radius * cos(angle);
      let y = radius * sin(angle);

      let hue = map(i, 0, waveform.length, 0, 360); // Hue transition
      stroke((hue + frameCount) % 360, 80, 100); // Animate color

      curveVertex(x, y); // Curve-based shape
    }

    endShape(CLOSE);

    // --- Volume Bar Indicator ---
    let barHeight = map(avgAmp, 0, 1, 10, height / 2); // Scale height
    push();
    translate(-width / 2 + 50, -height / 2 + height / 2); // Move to bottom left
    noStroke();
    fill(60, 100, 100); // Bright yellow
    rect(0, -barHeight, 20, barHeight); // Draw volume bar upward
    pop();
  } else {
    // Show loading message
    fill(255);
    textSize(24);
    text("Loading audio...", 20, 40);
  }
}

function mouseClicked() {
  if (loaded) {
    if (Tone.context.state !== "running") {
      Tone.start(); // Resume audio if not running
    }
    sound.stop();  // Restart sound from beginning
    sound.start();
  }
}
