// TODO:    Generating random points
//          Wrap p5JS funcs ?
//          Config file ?
class Canvas {

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
      this.d = config.point.diameter;
      
      this.generateRandomPoints();

    }
    

    generateRandomPoints() {
      for (let i = 0; i < config.canvas.numOfrandomPoints; i++) {
        this.addPoint(createVector(random(this.width - this.d), random(this.height - this.d)));
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
     * Delete point from points array
     * @param {Number} index 
     */
    deletePoint(index) {
      if (index < 0 || index >= this.points.length) {
        console.log("Invalid index, note we are indexing from 0");
      }
      
      this.points.splice(index, 1);
    }

  
    /**
     * TODO: Action class where we define these actions ?
     * Traverse all points and check whether the click was
     * inside one of them. Not the most optimal solution
     * but for now it is sufficient.
     * @returns void
     */
    //! Add point
    leftClickAction(coords) {
      let index = this.#hasClickedPoint(coords);
      
      if (index == -1) {
        // If left click was not registered on point, we add a new point instead of selecting existing
        this.addPoint(createVector(mouseX, mouseY));
        return;
      }
      
      this.points[index].toggle();
      this.clickedPoint = this.clickedPoint == -1 ? index : -1; // Toggle
    }

    //! Delete point
    leftClickAltAction(coords) {
      let index = this.#hasClickedPoint(coords);
      if (index == -1) {
        return;
      }
      
      this.deletePoint(index);
    }
    
    //! Erase all points
    leftClickShiftAction() {
      this.points = [];
      this.clickedPoint = -1;
      task = null;
    }
  
    /**
     * Method called every frame
     */
    update() {
  
      if (this.clickedPoint != -1) {
        // mouseX and mouseY are global variables provided by p5JS
        this.points[this.clickedPoint].x = mouseX
        this.points[this.clickedPoint].y = mouseY;
      }
      
      for (let i=0; i < this.points.length; ++i) {
          this.points[i].draw(i);
      }

    }

    // Private methods

    /**
     * Simple checker.
     * @param {p5.Vector} coordinates  mouseX and mouseY when click happened 
     * @returns index of a clicked point or -1 if no point has been clicked
     */
     #hasClickedPoint(coords) {
      for (const [index, point] of this.points.entries()) {
        if (point.isInPoint(coords)) {
          return index;
        }
      }
      return - 1;
    }

  }