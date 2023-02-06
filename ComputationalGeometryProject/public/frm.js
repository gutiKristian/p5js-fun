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


// SECOND SEMINAR
function grahamScan() {
	points.sort((a, b) => a.x - b.x);
	// Find pivot q, the most right point q_x
	let q = points[0];
	points.sort(function(a, b) {
		if (a.x === b.x) {
			return a.y - b.y;
		}
		return a.x - b.x;
	});
	
	let stack = [];

	stack.push(points[0]);
	stack.push(points[1]);
	stack.push(points[2]);
	for (let i = 3; i < points.length + 1; ++i) {

		while (true) {
			
			let first = stack[stack.length - 3];
			console.log("FIRST: ", points.indexOf(first) + 1);
			let second = stack[stack.length - 2];
			console.log("SECOND: ", points.indexOf(second) + 1);
			let third = stack[stack.length - 1];
			console.log("THIRD: ", points.indexOf(third) + 1);
      // determinant
			let res = ((second.x - first.x) * (third.y - first.y)) - 
			((second.y - first.y) * (second.x - first.x));

			console.log("RES: ", res);

			if (res < 0) {
				break;
			} else {
				let p1 = stack.pop();
				console.log("POP: ", points.indexOf(p1) + 1);
				let p2 = stack.pop();
				console.log("POP: ", points.indexOf(p2) + 1);
				stack.push(third);
				console.log("WHILE PUSH: ", points.indexOf(third) + 1);
			}

			if (stack.length == 2)
				break;

		}

		if (i < points.length) {
			stack.push(points[i]);
			console.log("PUSH: ", i + 1);
		}
		
	}

	stack.push(points[0]);

	return stack;

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
    case 84: // t
      let H = null;
      if (task != null && task.taskNumber == 1) {
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
    default:
      console.log("Unknown Command");
      break;
  }

  // if (keyCode == 67) {
  //   // c
  //   // LINES_RES = giftWrapping();
	// LINES_RES = grahamScan();
  //   //prettyPrintVectors(LINES_RES);
  //   //console.log("POINTS");
  //   //prettyPrintVectors(points);
  // }
}




