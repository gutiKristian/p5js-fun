import {config} from './config.js';

// TODO:    Generating random points
//          Wrap p5JS funcs ?
//          Config file ?

export class Canvas {

    /**
     * Canvas where it all happens.
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor() {
      this.height =  config.canvas.height;
      this.width = config.canvas.width;
      this.points = []; // Array<Point>
      // None is clicked by default, otherwise it is equal to an index from the points array
      this.clickedPoint = -1;
      
      // for now here
      let d = config.point.diameter;
      
      for (let i=0; i < config.canvas.numOfrandomPoints; i++) {
        this.addPoint(createVector(random(this.width - d), random(this.height - d)));
      }

    }
    

    /**
     * Add basic point to the canvas
     * @param {p5.Vector} coords Vec2, poistion of mouse click
     */
    addPoint(coords) {
      let p = new Point(coords.x, coords.y)
      this.points.push(p)
    }
  
    /**
     * TODO: Action class where we define these actions ?
     * Traverse all points and check whether the click was
     * inside one of them. Not the most optimal solution
     * but for now it is sufficient.
     * @returns void
     */
    leftClickAction() {

      for (const [index, point] of this.points) {
        if (this.#isInCircle(point)) {
          this.selectedPoint = this.selectedPoint == -1 ? index : -1;
          point.click();
          return;
        }
      }

      // If left click was not registered on point, we add a new point instead of selecting existing
      this.addPoint(createVector(mouseX, mouseY));
    }  
  
  
    /**
     * Method called every frame
     */
    update() {
  
      if (this.clickedPoint != -1) {
        // mouseX and mouseY are global variables provided by p5JS
        this.points[this.clickedPoint].X = mouseX
        this.points[this.clickedPoint].Y = mouseY;
      }
      
      for (const point of this.points) {
          point.draw();
      }

    }

    // Private methods

    #isInCircle(coords) {
      // (x - x0)^2 + (y - y0)^2 = r^2
      // sqrt((x - x0)^2 + (y - y0)^2)) <= r
      return Math.sqrt(Math.pow(mouseX - coords.x, 2) + Math.pow(mouseY - coords.y, 2)) <= d/2;
    }
  }