// GLOBALS
let canvas;

// TODO: Inside individual Task
let LINES_RES = [];

// P5JS functions

function setup() {

  let d = config.point.diameter;
  let width = config.canvas.width;
  let height = config.canvas.height;

  createCanvas(width, height);
  canvas = new Canvas();
}

function draw() {
  background(220);

  canvas.update();

  // we want to connect these circles and thus draw vertices with shape     (noFill)
  // draw points
  noFill();
  beginShape();
  for (let i=0; i < LINES_RES.length; i++) {
    vertex(LINES_RES[i].x, LINES_RES[i].y);
  }
  endShape()
  
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


// FIRST SEMINAR
function giftWrapping() {
  H = [];
  points.sort((a, b) => b.y - a.y);
  // convex hull algorithm
  pj =  points[0];
  pj_1 = createVector(pj.x + 10, pj.y);
  
  H.push(pj);

  let minAngleIndex = -1;
  let currentAngle = Infinity;
  let currentPoint = null;
  while (H[0] != currentPoint) {
    
    currentAngle = Infinity;
    for (let i = 0; i < points.length; i++) {
        if (points[i] == pj)
            continue;
        
        let a = p5.Vector.sub(pj_1, pj);
        let b = p5.Vector.sub(points[i], pj);
        let angle = degrees(a.angleBetween(b));

        if (angle < currentAngle) {
            currentAngle = angle;
            minAngleIndex = i;
        }
    }
    
    
    currentPoint = points[minAngleIndex];
    pj_1 = pj;
    pj = currentPoint;
    H.push(currentPoint);
  }

  return H;
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
  if (keyCode == 67) {
    // c
    // LINES_RES = giftWrapping();
	LINES_RES = grahamScan();
    //prettyPrintVectors(LINES_RES);
    //console.log("POINTS");
    //prettyPrintVectors(points);
  }
}




