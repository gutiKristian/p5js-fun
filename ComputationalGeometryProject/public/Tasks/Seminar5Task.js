class Seminar5Task extends Task {
    constructor() {
      super();
      this.taskNumber = 5;
      this.points = null;
      console.log("Task 5, Delaunay triangulation");
    }

    #cross(p1, p2, p3) {
      let u1 = p2.x - p1.x;
      let v1 = p2.y - p1.y;
      let u2 = p3.x - p1.x;
      let v2 = p3.y - p1.y;
      return u1 * v2 - v1 * u2;
    }

    circumcircle(p1, p2, p3) {
      let Bx = p2.x - p1.x;
      let By = p2.y - p1.y;
      let Cx = p3.x - p1.x;
      let Cy = p3.y - p1.y;
      let D = 2 * (Bx * Cy - By * Cx);
      let center_x = p1.x + (Cy * (Bx*Bx + By*By) - By * (Cx*Cx + Cy*Cy)) / D;
      let center_y = p1.y + (Bx * (Cx*Cx + Cy*Cy) - Cx * (Bx*Bx + By*By)) / D;
      let radius = Math.sqrt((center_x - p1.x) * (center_x - p1.x) + (center_y -
        p1.y) * (center_y - p1.y));
      return [createVector(center_x, center_y), radius];
    }

    delaunayDist(edge, point) {
      let c = this.circumcircle(point, edge[0], edge[1]); // [center, radius]
      if (this.#cross(edge[0], point, edge[1]) * this.#cross(edge[0], c[0], edge[1]) > 0) {
        return c[1];
      }
      return -c[1];
    }

    dp(edge, points) {
      let min_dist = Infinity;
      let min_dist_p = null;
      for (let i = 0; i < points.length; i++) {
        if (this.#cross(edge[0], points[i], edge[1]) > 0) {
          let dist = this.delaunayDist(edge, points[i]);
          if (dist < min_dist) {
            min_dist = dist;
            min_dist_p = points[i];
          }
        }
      }
      return min_dist_p;
    }

    #swapOrientation(edge) {
      let temp = edge[0];
      edge[0] = edge[1];
      edge[1] = temp;
      return edge;
    }

    addToAEL(edge, AEL, DT) {

      // Create new edge _e = ba, edge = ab
      let _e = [edge[1], edge[0]];

      // if (_e is in AEL)
        // remove e from AEL
      // else
        // push e to AEL
      // push e to DT
      let isFound_E = false;
      let index = -1;

      for (let i = 0;  i < AEL.length; ++i) {
        if (_e[0].hasSameCoordinates(AEL[i][0]) && _e[1].hasSameCoordinates(AEL[i][1])) {
          isFound_E = true;
          index = i;
        }
      }

      if (!isFound_E) {
        AEL.push(edge);
      } else {
        AEL.splice(index, 1);
      }

      DT.push(edge);

    }
    
    compute(canvas) {

      let AEL = [];
      let DT = [];

      let points = canvas.points;

      // Get a 'random' point and find the nearest point to it
      let p = points[0];
      let min_dist_p = null;
      let min_dist = Infinity;
      for (let i = 1; i < points.length; ++i) {
        let v1 = p.Vector;
        let v2 = points[i].Vector
        let current = p5.Vector.dist(v1, v2);
        if (current < min_dist) {
          min_dist = current;
          min_dist_p = points[i];
        }
      }

      // Create and edge
      let e = [p, min_dist_p];
      
      let closestToEdge = this.dp(e, points);

      if (closestToEdge == null) {
        e = this.#swapOrientation(e);
        closestToEdge = this.dp(e, points);
      }

      this.addToAEL(e, AEL, DT);
      this.addToAEL([e[1], closestToEdge], AEL, DT);
      this.addToAEL([closestToEdge, e[0]], AEL, DT);

      let closest_p = null;
      while (AEL.length > 0) {

        // First edge
        let _e = AEL[0];
        
        //? _e = ?
        _e = this.#swapOrientation(_e);
        
        closest_p = this.dp(_e, points);

        if (closest_p != null) {
          this.addToAEL([_e[1], closest_p], AEL, DT);
          this.addToAEL([closest_p, _e[0]], AEL, DT);
        } else {

        }

        DT.push(_e);
        // Simulation of queue
        AEL.shift();
      }

      console.log(AEL);

      this.result = DT;

      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    prettyPrintEdges(vecArray) {
      let s = "";
      for(let i = 0; i < vecArray.length; i++) {
        s += "[ "  + vecArray[i][0].x + ", " + vecArray[i][1].x + "], ";
      }
      console.log(vecArray.length);
      console.log(s);
    }

    show() {
      for (let i = 0; i < this.result.length; ++i) {
        let e = this.result[i];
        line(e[0].x, e[0].y, e[1].x, e[1].y);
      }
    }
}
  