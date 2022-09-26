
let LINES_RES = [];

// Number of initial points
let numOfPoints = 0;  // number of random points

// Initial points
let points = [];

// Canvas size
let canvasHeight = 500;
let canvasWidth = 800;
let d = 20;

// none -> -1 else in range [0, numOfPoints -1]
let selectedPoint = -1;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  for (let i=0; i < numOfPoints; i++) {
    points.push(createVector(random(canvasWidth - d), random(canvasHeight - d)));
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
    if (LINES_RES.includes(points[i]))
      fill(0, 255, 0);
    else if (i === selectedPoint)
      fill(255, 0, 0);
    else
      fill(255);
    circle(points[i].x, points[i].y, 10);

	fill(0);
	textSize(20);
	text(i + 1 + "[" + points[i].x + ", " + points[i].y + "]", points[i].x - 30, points[i].y + 25);
  }

  // we want to connect these circles and thus draw vertices with shape     (noFill)
  // draw points
  noFill();
  beginShape();
  for (let i=0; i < LINES_RES.length; i++) {
    vertex(LINES_RES[i].x, LINES_RES[i].y);
  }
  endShape()
  
}


function isInCircle(coords) {
  // is my click inside the circle ?
  // (x - x0)^2 + (y - y0)^2 = r^2
  // sqrt((x - x0)^2 + (y - y0)^2)) <= r
  return Math.sqrt(Math.pow(mouseX - coords.x, 2) + Math.pow(mouseY - coords.y, 2)) <= d/2;
}


// this function fires after the mouse has been
// clicked anywhere
function mouseClicked(event) {
  
   if(event.altKey) {
      // reset in the func call
      console.log("RIGHT");
     selectedPoint = -1;
      let clicked_point = false;
      for (let i=0; i < points.length; i++) {
        if (isInCircle(points[i])) {
          points.splice(i, 1);
        }
    }
     
  } else if(event.shiftKey) {
    selectedPoint = -1;
    points = [];
  } else {
    console.log("LEFT");
    let clicked_point = false;
    for (let i=0; i < points.length; i++) {
      if (isInCircle(points[i])) {
        selectedPoint = selectedPoint == -1 ? i : -1;
        clicked_point = true;
        break;
      }
    }
  
    if (!clicked_point) {
      points.push(createVector(mouseX, mouseY));
    }
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




