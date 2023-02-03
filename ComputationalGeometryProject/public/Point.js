// import { config } from "./config.js";

class Point {
    /**
     * Class for representing point. Either placed by user or auto-generated.
     * @param {Number} x coordinate within canvas width
     * @param {Number} y coordinate within canvas height
     * @param {Number} d diameter
     * @param {[Number, Number, Number]} color color for of the point
     * @param {[Number, Number, Number]} selectedColor when point is clicked
     */
    constructor(x, y, d = config.point.diameter, color = config.point.defaultColor ,
      selectedColor = config.point.selectedColor) {
  
      if (color.length != 3) {
        throw new Error("Color is of type [Number, Number, Number]");
      }
  
      if (!color.every((x) => x >=0 && x <= 255)) {
        throw new Error("Values for color must be within range <0, 255>");
      }
      
      // x and y coordinates are set wtihin mousclick callback from p5js this
      // always come from the canvas boundaries
      this.vector = createVector(x, y);
      this.d = d;
      this.color = color;
      this.selectedColor = selectedColor;
      this.isSelected = false;
      // Used in seminar3, 0 - top and bottom, 1,2 left or right doesn't matter (left, right is a thing of pov)
      this.path = -1; 
    }
  
    set x(x) {
      this.vector.x = x;
      
    }
  
    set y(y) {
      this.vector.y = y;
    }

    get x() {
      return this.vector.x;
    }

    get y() {
      return this.vector.y;
    }

    get Vector() {
      return this.vector;
    }
     
    toggle() {
      this.isSelected = !this.isSelected;
    }
  
    draw(i) {
      if (this.isSelected)
        fill(this.selectedColor[0], this.selectedColor[1], this.selectedColor[2]);
      else
        fill(this.color[0], this.color[1], this.color[2]);
      circle(this.vector.x, this.vector.y, this.d);
      
      fill(0);
	    textSize(20);
	    text(i + 1 + "[" + this.vector.x + ", " + this.vector.y + "]",
      this.vector.x - 30, this.vector.y + 25);
    }

    isInPoint(coords) {
      // (x - x0)^2 + (y - y0)^2 = r^2
      // sqrt((x - x0)^2 + (y - y0)^2)) <= r
      return Math.sqrt(Math.pow(coords.x - this.vector.x, 2) + Math.pow(coords.y - this.vector.y, 2)) <= config.point.diameter/2;
    }

  }