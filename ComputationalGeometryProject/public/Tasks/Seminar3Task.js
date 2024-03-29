class Seminar3Task extends Task {
    constructor(H) {
      super();
      this.taskNumber = 3;
      this.points = H;
      console.log("Task 3, Triangulation");
      console.log("Result is list of tuples, where each tuple represents edge, eg. from tuple[0] to tuple[1].");
    }

    isCorrectLine(p1, p2, p3) {
      return ((p2.x - p1.x) * (p3.y - p1.y)) - ((p2.y - p1.y) * (p3.x - p1.x)) >= 0;
    }

    compute(canvas) {

      if (canvas.points.length <= 3)
        return;

      if (this.points != null) {
        this.points.pop();
        // I just overwrite, didn't come up with any nicer solution
        let newPts = [];
        for (const p of this.points) {
          newPts.push(new Point(p.x, p.y));
        }
        canvas.points = newPts;
      }
      
      this.points = canvas.points.map((p) => p.Vector);
      
      //! WE ARE WORKING WITH MONOTONE POLYGON !
      //! If we want algorithm for non-monotone we would have to implement procedure
      //! that transforms non-monotone to monotone hence deleteing split and merge vertices from such polygon

      let bottom_index = -1;
      let top_index = -1;

      // It is inverted in p5js top is at 0
      let max_y = 1000000;
      let min_y = -1;
      
      for (let i = 0; i < canvas.points.length; ++i)
      {
        if (canvas.points[i].y <= max_y)
        {
          if (top_index != -1 && canvas.points[i].y == max_y && canvas.points[i].x > canvas.points[top_index].x)
          {
            continue;
          }
          max_y = canvas.points[i].y;
          top_index = i;
        }

        if (canvas.points[i].y >= min_y)
        {
          if (top_index != -1 && canvas.points[i].y == max_y && canvas.points[i].x > canvas.points[top_index].x)
          {
            continue;
          }
          min_y = canvas.points[i].y;
          bottom_index = i;
        }
      }

      // Split at minimal and maximal point -> U is max_point and V is min_point
      // These points are used to identify left and right path
      /*
                  *U
             *         
                          *
          *           *
                *V 
      */
      
      canvas.points[top_index].path = 0;
      canvas.points[bottom_index].path = 0;

      console.log("Max point index: ", top_index);
      console.log("Min point index: ", bottom_index);

      // Path is 1 (doesn't matter left, right), we will switch between 1 and 2
      let current_path = 1;

      // Mark the path in flag array
      for (let i = 0; i < canvas.points.length; ++i)
      {
        if (i == top_index || i == bottom_index)
        {
          current_path = current_path == 1 ? 2 : 1;
          continue;
        }

        canvas.points[i].path = current_path;
      
      }

      console.log(canvas.points)

      // Now points have initialized path attribute
      let points = canvas.points;
      points.sort(function(a, b) {
        if (a.y == b.y) {
            return a.x - b.x;
        }
        return a.y - b.y;
      });
      
      // But here we need to find out the left and right -- is 1 left or right
      let min_x = canvas.width + 100;
      let min_x_index = -1;
      // skip top and bottom
      for (let i = 1; i < points.length - 2; ++i)
      {
        if (points[i].x < min_x)
        {
          min_x_index = i;
          min_x = points[i].x;
        }
      }
      const LEFT = points[min_x_index].path;
      const RIGHT = LEFT == 1 ? 2 : 1;

      // Stack contains already traversed points, which were not yet triangulated
      // push, pop
      let stack = []

      // Starting from the top
      stack.push(points[0]);
      stack.push(points[1]);

      for (let i = 2; i < points.length; ++i)
      {
        let stackTop = stack.at(-1);
        
        if (stackTop.path ==  points[i].path)
        {
          // Same path
          while (stack.length >= 2 && this.isCorrectLine(stack.at(-2), stack.at(-1), points[i]) == (points[i].path == RIGHT)) {
            this.result.push([points[i], stack.at(-2)]);
            stack.pop();
          }

          stack.push(points[i]);

        }
        else
        {
          let top = stack.at(-1);
          // Other path
          while (stack.length > 0) {
            let p = stack.pop();
            this.result.push([points[i], p]);  
          }

          // stack.push(top);
          stack.push(points[i]);
        }

      }

      
      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    show() {

      for (let i=0; i < this.result.length; i++) {
        line(this.result[i][0].x, this.result[i][0].y, this.result[i][1].x, this.result[i][1].y);
      }

      noFill();
      beginShape();
      for (let i=0; i < this.points.length; i++) {
        vertex(this.points[i].x, this.points[i].y);
      }
      endShape(CLOSE);

    }
}
  