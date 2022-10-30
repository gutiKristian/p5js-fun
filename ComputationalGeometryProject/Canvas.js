import {config} from './config.js';

// TODO:    Generating random points
//          Wrap p5JS funcs ?
//          Config file ?

export class Canvas {

    /**
     * Canvas where it all happens.
     * Parameters are initialized with values from config file, but you may override in the constructor
     * @param {Number} height 
     * @param {Number} width 
     */
    constructor(height = config.canvas.height, width = config.canvas.width) {
      this.height = height;
      this.width = width;
      this.points = []; // Array<Point>
      // None is clicked by default, otherwise it is equal to an index from the points array
      this.clickedPoint = -1;
    }
    

    /**
     * Add basic point to the canvas
     * @param {p5.Vector} coords Vec2, poistion of mouse click
     */
    addPoint(coords) {
      let p = new Point(coords.x, coords.y)
      this.points.push(p)
    }
  
    hasClickedPoint() {
      
      for (let i=0; i < this.points.length; ++i) {
        // TODO: isInCircle to Canvas class
        if (isInCircle(this.points[i])) {
          // Toggle
          selectedPoint = selectedPoint == -1 ? i : -1;
          this.points[i].click();
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
  
  
    }
  }