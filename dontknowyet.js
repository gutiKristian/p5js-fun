let numOfPoints = 5;
let points = [];
let canvas = 400;
let d = 20;
// none -> -1 else in range [0, numOfPoints -1]
let selectedPoint = -1;

function setup() {
  createCanvas(canvas, canvas);
  for (let i=0; i < numOfPoints; i++) {
    let x = Math.floor(Math.random() * (canvas - d));
    let y = Math.floor(Math.random() * (canvas - d));
    points.push(createVector(x, y));
  }
}

function draw() {
  background(220);

  // move selected point
  if (selectedPoint != -1) {
    points[selectedPoint].x = mouseX;
    points[selectedPoint].y = mouseY;
  }

  // draw points
  for (let i=0; i < points.length; i++) {
    if (i === selectedPoint)
      fill(255, 0, 0);
    else
      fill(255);
    circle(points[i].x, points[i].y, 25);
  }
}


function isInCircle(coords) {
  // is my click inside the circle ?
  // (x - x0)^2 + (y - y0)^2 = r^2
  // sqrt((x - x0)^2 + (y - y0)^2)) <= r
  return Math.sqrt(Math.pow(mouseX - coords.x, 2) + Math.pow(mouseY - coords.y, 2)) <= d/2;
}


// this function fires after the mouse has been
// clicked anywhere
function mouseClicked() {
  for (let i=0; i < points.length; i++) {
    if (isInCircle(points[i])) {
      selectedPoint = selectedPoint == -1 ? i : -1;
      return;
    }
  }
}