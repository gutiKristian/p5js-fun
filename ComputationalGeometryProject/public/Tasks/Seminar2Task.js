class Seminar2Task extends Task {
    constructor() {
      super();
      this.taskNumber = 2;
      this.result = [];
      console.log("Task 2, Convex Hull Graham Scan");
    }

    compute(canvas) {
      let points = canvas.points;
      points.sort((a, b) => a.x - b.x);

      // Find pivot q, the most right point q_x
      let q = points[0];
      
      points.sort(function(a, b) {
        if (a.y == b.y) {
            return a.x - b.x;
        }
        return a.y - b.y;
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


      this.result = stack;
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
