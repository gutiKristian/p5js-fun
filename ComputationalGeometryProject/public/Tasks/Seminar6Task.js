class Seminar6Task extends Task {
    constructor(task5) {
      super();
      this.task5 = task5;
      this.taskNumber = 6;
      this.points = null;
      this.triangles = task5.triangles;
      this.outerEdges = task5.outEdges;
      this.resultEdges = [];
      this.resultPoints = [];
      console.log("Task 6, Voronoi diagrams");
    }

    adjacentTriangles(triangle1, triangle2) {
      let counter = 0;
      for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
          if (triangle1[i].hasSameCoordinates(triangle2[j])) {
            ++counter;
          }
        }
      }
      return counter > 1;
    }

    isOuter(edge) {
      for (let i = 0; i < this.outerEdges.length; ++i) {
        // Checking the flip as well
        if ((this.outerEdges[i][0].hasSameCoordinates(edge[0]) && this.outerEdges[i][1].hasSameCoordinates(edge[1])) ||
            (this.outerEdges[i][1].hasSameCoordinates(edge[0]) && this.outerEdges[i][0].hasSameCoordinates(edge[1]))) {
          return true;
        }
      }
      return false;
    }

    isCenterInside(p1, p2, p3, center) {
      let A = p1;
      let B = p2;
      let C = p3;

      let AB = p5.Vector.sub(B, A);
      let AC = p5.Vector.sub(C, A);
      let AP = p5.Vector.sub(center, A);

      let dot00 = p5.Vector.dot(AB, AB);
      let dot01 = p5.Vector.dot(AB, AC);
      let dot02 = p5.Vector.dot(AB, AP);
      let dot11 = p5.Vector.dot(AC, AC);
      let dot12 = p5.Vector.dot(AC, AP);

      let inverDeno = 1 / (dot00 * dot11 - dot01 * dot01);

      let u = (dot11 * dot02 - dot01 * dot12) * inverDeno;
      let v = (dot00 * dot12 - dot01 * dot02) * inverDeno;

      return (u >= 0) && (v >= 0) && (u + v < 1);
    }

    crossZ(p1, p2) {
      return p1.x * p2.y - p1.y * p2.x;
    }
  
    isAboveEdge(edge, p) {
      // [p1, p2], vector
      const p1 = createVector(p.x - edge[0].x, p.y - edge[0].y);
      const p2 = createVector(edge[1].x - edge[0].x, edge[1].y - edge[0].y);
      const c = this.crossZ(p1, p2);
      return (c > 0) ? +1 : ((c < 0) ? -1 : 0);
    }

    outGoingEdges(circle, edges, triangle, allTriangles) {

      // 0 - 1, 0 - 2,  1 - 2, ////1 - 1

      for (let i = 0; i < 2; ++i) {
        let p1 = triangle[i];
        for (let j = 1; j < 3; ++j) {
          let p2 = triangle[j];
          
          if (p1 == p2 || !this.isOuter([p1, p2])) {
            continue;
          }

          // Outer edge
          let bisector = p5.Vector.add(p1.Vector, p2.Vector).div(2);
          let vv;
          let dir;

          if (this.isCenterInside(triangle[0].Vector, triangle[1].Vector, triangle[2].Vector, circle[0])) {
            dir = circle[0];
            vv = p5.Vector.sub(bisector, circle[0]);
          } else {
            dir = bisector;
            let isInAnother = false;
              for (const tr of allTriangles) {
                if (this.isCenterInside(tr[0].Vector, tr[1].Vector, tr[2].Vector, circle[0])) {
                    isInAnother = true;
                    break;
                }
              }
              if (isInAnother) {
                  dir = circle[0];
                  vv = p5.Vector.sub(bisector, circle[0]);
              } else {
                  dir = circle[0];
                  vv = p5.Vector.sub(circle[0], bisector);
              }
          }

          vv.x *= 9999; // We scale direction
          vv.y *= 9999; // We scale direction

          const newEdge = [dir, p5.Vector.add(dir, vv)];
          edges.push(newEdge);


          // let vv;
          // if (this.isCenterInside(triangle[0].Vector, triangle[1].Vector, triangle[2].Vector, circle[0])) {
          //   vv = p5.Vector.sub(bisector, circle[0]);
          // } else {

          //   vv = p5.Vector.sub(circle[0], bisector);

          //   let ee = [p1, p2];
          //   if (p1.x > p2.x) {
          //       ee = [p2, p1];
          //   }

          //   if (this.isAboveEdge(ee, circle[0]) === -1) {
          //     vv = p5.Vector.sub(bisector, circle[0]);
          //   } else {
          //     vv = p5.Vector.sub(circle[0], bisector);
          //   }

          // }
          
          

          // vv.mult(1000);

          // edges.push([circle[0], p5.Vector.add(circle[0], vv)]);
          
          //?
          // let v1 = p5.Vector.sub(circle[0], bisector); // (center - bisector) + center
          // let v2 = p5.Vector.sub(bisector, circle[0]); // (bisector - center) + center

          // const P1 = p5.Vector.add(v1, circle[0]);
          // const P2 = p5.Vector.add(v2, circle[0]);
          // if (dist(P1.x, P1.y, p1.x, p1.y) > dist(P2.x, P2.y, p1.x, p1.y)) {
          //   edges.push([circle[0], p5.Vector.add(circle[0], v1.mult(2000))]);
          // } else {
          //   edges.push([circle[0], p5.Vector.add(circle[0], v2.mult(2000))]);
          // }
        }
      }
    }

    compute(canvas) {
      let pts = [];
      let edgs = [];

      for (let i = 0; i < this.triangles.length; ++i){
        let [center, radius] = this.task5.circumcircle(this.triangles[i][0], this.triangles[i][1], this.triangles[i][2]);
        for (let j = 0; j < this.triangles.length; ++j){
          if (i != j && this.adjacentTriangles(this.triangles[i], this.triangles[j])){
            let [diff_center, diff_radius] = this.task5.circumcircle(this.triangles[j][0], this.triangles[j][1], this.triangles[j][2]);
            edgs.push([createVector(center.x, center.y), createVector(diff_center.x, diff_center.y)]);
          }
        }
        pts.push(center);
        this.outGoingEdges([center, radius], edgs, this.triangles[i], this.triangles);
      }
      
      this.resultEdges = edgs;
      this.resultPoints = pts;

      console.log("DONE");
      this.isDone = true;
    }

    show() {
      this.task5.show();
      // Render lines
      for (let i = 0; i < this.resultEdges.length; ++i) {
        let e = this.resultEdges[i];
        line(e[0].x, e[0].y, e[1].x, e[1].y);
      }
      // Render points
      for (let i = 0; i < this.resultPoints.length; ++i) {
        fill(255, 0, 0);
        circle(this.resultPoints[i].x, this.resultPoints[i].y, 15);
      }
    }
}