class Seminar3Task extends Task {
    constructor() {
      super();
      this.taskNumber = 3;
      this.points = null;
      console.log("Task 3, Triangulation");
      console.log("Result is list of tuples, where each tuple represents edge, eg. from tuple[0] to tuple[1].");
    }

    compute(canvas) {

      if (canvas.points.length <= 3)
        return;

      // For input from convex hull we must do something else :)))))))))))
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
        
        if (stackTop.path == 0 || stackTop.path ==  points[i].path)
        {
          // Same path
          for (let j = 0; j < stack.length; ++j)
          {
            let p = stack.pop();
            
            let u = p5.Vector.sub(points[i-1].Vector, points[i].Vector)
            let v = p5.Vector.sub(p.Vector, points[i].Vector);
            let det = u.x * v.y - u.y * v.x;

            if ((det > 0 && p.path == RIGHT) || (det < 0 && p.path == LEFT))
            {
              this.result.push([points[i], p]);
            } 
            else
            {
              stack.push(p);
            }

          }
          stack.push(points[i]);

        }
        else
        {
          let top = stack.at(-1);
          // Other path
          for (let j = 0; j < stack.length; ++j)
          {
            let p = stack.pop();
            this.result.push([points[i], p]);           
          }
          stack.push(top);
          stack.push(points[i]);
        }

      }

      
      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    show() {
      noFill();
      beginShape();
      for (let i=0; i < this.result.length; i++) {
        for (let j=0; j < 2; ++j)
        {
          vertex(this.result[i][j].x, this.result[i][j].y);
        }
      }
      endShape();

      noFill();
      beginShape();
      for (let i=0; i < this.points.length; i++) {
        vertex(this.points[i].x, this.points[i].y);
      }
      endShape(CLOSE);

    }
}
  