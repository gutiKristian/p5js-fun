// GLOBALS
let canvas;
let task = null;
let subtask = null;
// P5JS functions

function setup() {

  let width = config.canvas.width;
  let height = config.canvas.height;

  createCanvas(width, height);
  canvas = new Canvas();
}

function draw() {
  background(220);

  canvas.update();
  if (task && task.isDone) {
    task.show();
  }

  /* 
  KEYS
  */
  fill(0, 0, 0);
  textSize(12);
  text("Tasks", 10, 10);
  text("c - Task1 - Convex Hull", 10, 22);
  text("g - Task2 - Convex Hull Graham Scan", 10, 34);
  text("t - Task3 - Triangulation Sweep Line", 10, 46);
  text("o - Task4 - kDTree", 10, 58);
  text("d - Task5 - Delaunay triangulation", 10, 70);
  text("d - Task6 - Voronoi diagram", 10, 82);
  text("Canvas controls", 10, 94);
  text("r - to generate random points", 10, 106);
  text("Left click generate point, click on point to move", 10, 118);
  text("Shift + Left click to reset scene, Alt + Left click to delete point", 10, 130);

  // we want to connect these circles and thus draw vertices with shape     (noFill)
  // draw points
  // noFill();
  // beginShape();
  // for (let i=0; i < LINES_RES.length; i++) {
  //   vertex(LINES_RES[i].x, LINES_RES[i].y);
  // }
  // endShape()
  
}


// this function fires after the mouse has been
// clicked anywhere
function mouseClicked(event) {
  
  let coords = createVector(mouseX, mouseY);

  if(event.altKey) {
    canvas.leftClickAltAction(coords);   
  } else if(event.shiftKey) {
    canvas.leftClickShiftAction();
  } else {
    canvas.leftClickAction(coords);
  }
  
}



function prettyPrintVectors(vecArray) {
  let s = "";
  for(let i = 0; i < vecArray.length; i++) {
    s += "[" + vecArray[i].x + ", " + vecArray[i].y + "], ";
  }
  console.log(s);
}

function keyPressed() {
  
  switch(keyCode) {
    case 67: // c
      task = new Seminar1Task();
      task.compute(canvas);
      break;
    case 71: // g
      task = new Seminar2Task();
      task.compute(canvas);
      break;
    case 84: // t
      let H = null;
      if (task != null && task.taskNumber == 1 || task.taskNumber == 2) {
        H = task.result;
      }
      task = new Seminar3Task(H);
      task.compute(canvas);
      break;
    case 79: // o
      task = new Seminar4Task();
      task.compute(canvas);
      break;
    case 68: // d
      task = new Seminar5Task();
      task.compute(canvas);
      break;
    case 86: // v
      subtask = new Seminar5Task();
      subtask.compute(canvas);
      task = new Seminar6Task(subtask);
      task.compute(canvas);
      break;
    case 82: //r
      canvas.leftClickShiftAction();
      canvas.generateRandomPoints();
    default:
      console.log("Unknown Command");
      break;
  }

}




