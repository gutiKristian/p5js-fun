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
  fill(255);
  for (let i=0; i < points.length; i++) {
    circle(points[i].x, points[i].y, 25);
  }
}


// this function fires after the mouse has been
// clicked anywhere
function mouseClicked() {
  console.log(mouseX);
  console.log(mouseY);
}