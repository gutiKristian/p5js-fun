class Seminar3Task extends Task {
    constructor() {
      super();
      this.taskNumber = 3;
      console.log("Task 3, Triangulation");
      console.log("Result is list of tuples, where each tuple represents edge, eg. from tuple[0] to tuple[1].");
    }

    compute(canvas) {

      if (canvas.points.length <= 3)
        return;

      //! WE ARE WORKING WITH MONOTONE POLYGON !
      //! If we want algorithm for non-monotone we would have to implement procedure
      //! that transforms non-monotone to monotone hence deleteing split and merge vertices from such polygon

      let points = canvas.points;

      // First sort to find min and max, can be also done in O(n) with single for loop pass
      // Lexicographically sort the vertices
      // p > q  <=>  p_y > q_y or p_y = q_y and p_x < q_x
      points.sort(function(a, b) {
          if (a.x === b.x) {
              return a.y - b.y;
          }
          return a.x - b.x;
      });

      // Split at minimal and maximal point -> U is max_point and V is min_point
      // These points are used to identify left and right path
      /*
                  *U
             *         
                          *
          *           *
                *V 
      */
      
      let max_point_index = canvas.points.indexOf(points[0]);
      let min_point_index = canvas.points.indexOf(points[points.length - 1]);

      canvas.points[max_point_index].path = 0;
      canvas.points[min_point_index].path = 0;
      
      // Path is 1 (doesn't matter left, right), we will switch between 1 and 2
      let current_path = 1;

      // Mark the path in flag array
      for (let i = 0; i < canvas.points.length; ++i)
      {
        if (i == max_point_index || i == min_point_index)
        {
          current_path = current_path == 1 ? 2 : 1;
          continue;
        }

        canvas.points[i].path = current_path;
      
      }

      // Now points have initialized path attribute
      points = canvas.points;
      points.sort(function(a, b) {
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
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
            
            // Create line with p
            // Check if it is correct
            // If correct push into result            
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
            this.result.push([points.i, p]);           
          }
          stack.push(top);
          stack.push(points[i]);
        }

      }

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
  