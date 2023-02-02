class Seminar1Task extends Task {
    constructor() {
      super();
      this.taskNumber = 1;
      console.log("Task 1, Convex Hull");
    }

    compute(canvas) {

      let loopCounter = 0;

      console.log("Starting computation...");
      let H = [];
      let points = canvas.points;

      console.log("Points in computation: ", points.length);

      points.sort((a, b) => b.y - a.y);

      console.log("Points local:", points);
      console.log("Points canvas:", canvas.points);
      // convex hull algorithm
      let pj =  points[0].Vector;
      let pj_1 = createVector(pj.x + 10, pj.y);
      
      H.push(pj);
  
      let minAngleIndex = -1;
      let currentAngle = Infinity;
      let currentPoint = null;
      while (H[0] != currentPoint) {
        ++loopCounter;
        currentAngle = Infinity;
        for (let i = 0; i < points.length; i++) {
            if (points[i].Vector == pj)
                continue;
            
            let a = p5.Vector.sub(pj_1, pj);
            let b = p5.Vector.sub(points[i].Vector, pj);
            let angle = degrees(a.angleBetween(b));
    
            if (angle < currentAngle) {
                currentAngle = angle;
                minAngleIndex = i;
            }
        }
        
        
        currentPoint = points[minAngleIndex].Vector;
        pj_1 = pj;
        pj = currentPoint;
        H.push(currentPoint); // Pushing only vectors !! Good for now

        if (loopCounter > points.length * 3) {
          console.log("Something went wrong");
          console.log("Convex Hull");
          console.log(H);
          console.log("PJ");
          console.log(pj);
          console.log("PJ_1");
          console.log(pj_1);
          return;
        }

      }
    
      this.result = H;
      this.isDone = true;
      console.log("Computation Done.");
    }

    show() {
      noFill();
      beginShape();
      for (let i=0; i < this.result.length; i++) {
        vertex(this.result[i].x, this.result[i].y);
      }
      endShape()
    }
}
  