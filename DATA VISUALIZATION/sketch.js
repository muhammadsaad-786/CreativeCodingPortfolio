let table;        // CSV data table
let bars = [];    // Array to store bar chart data
let animationSpeed = 0.05;  // Easing speed for smooth bar animation

function preload() {
  // Load the CSV file before the sketch starts
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 500);           // Canvas size
  textSize(14);                     // Text size for labels
  textAlign(CENTER, CENTER);        // Center-align all text

  let numRows = table.getRowCount();
  let barSpacing = width / numRows;

  for (let i = 0; i < numRows; i++) {
    let name = table.getString(i, 'Name');     // Get name from CSV
    let score = table.getNum(i, 'Score');      // Get score from CSV
    let targetHeight = map(score, 0, 100, 0, height - 150);  // Scale height

    bars.push({
      name: name,
      score: score,
      currentHeight: 0,                 // Start at 0 for animation
      targetHeight: targetHeight,       // Final height
      x: i * barSpacing + barSpacing / 4,  // X-position
      width: barSpacing / 2             // Bar width
    });
  }
}

function draw() {
  // --- Dark Gray Gradient Background ---
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(30), color(60), inter);  // Dark to less dark gray
    stroke(c);
    line(0, y, width, y);
  }

  // --- Centered Title in Middle of Canvas ---
  push();
  textSize(36);
  textStyle(BOLD);
  fill(200);
  let wave = sin(frameCount * 0.05) * 5;  // Subtle animation
  text("📊 Score Visualization", width / 2, height / 2 - 200 + wave);  // Centered at top third
  pop();

  // --- Draw Bars ---
  for (let bar of bars) {
    // Smoothly animate to target height
    let diff = bar.targetHeight - bar.currentHeight;
    bar.currentHeight += diff * animationSpeed;

    // Color based on score: red to green
    let col = lerpColor(color(255, 80, 80), color(80, 220, 100), bar.score / 100);

    // Hover effect
    let isHovered = mouseX > bar.x && mouseX < bar.x + bar.width &&
                    mouseY > height - bar.currentHeight - 40 && mouseY < height - 40;

    if (isHovered) {
      fill(col);
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = col;
    } else {
      fill(col);
      drawingContext.shadowBlur = 0;
    }

    // Draw bar with glow and round corners
    rect(bar.x, height - bar.currentHeight - 40, bar.width, bar.currentHeight, 8);

    drawingContext.shadowBlur = 0;

    // Draw labels
    fill(255);
    textSize(12);
    text(bar.name, bar.x + bar.width / 2, height - 20);

    if (isHovered) {
      textSize(16);
      textStyle(BOLD);
      text(`Score: ${bar.score}`, bar.x + bar.width / 2, height - bar.currentHeight - 60);
    }
  }
}
