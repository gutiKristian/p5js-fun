export class Point {
    /**
     * Class for representing point. Either placed by user or auto-generated.
     * @param {Number} x coordinate within canvas width
     * @param {Number} y coordinate within canvas height
     * @param {Number} d diameter
     * @param {[Number, Number, Number]} color color for of the point
     * @param {[Number, Number, Number]} selectedColor when point is clicked
     */
    constructor(x, y, d = 10, color = [255, 255, 255] , selectedColor = [255, 255, 0]) {
  
      if (color.length != 3) {
        throw new Error("Color is of type [Number, Number, Number]");
      }
  
      if (!color.every((x) => x >=0 && x <= 255)) {
        throw new Error("Values for color must be within range <0, 255>");
      }
      
      // x and y coordinates are set wtihin mousclick callback from p5js this
      // always come from the canvas boundaries
  
      this.x = x;
      this.y = y;
      this.d = d;
      this.color = color;
      this.selectedColor = selectedColor;
      this.isSelected = false;
    }
  
    get isSelected() {
      return this.isSelected;
    }
  
    set X(x) {
      this.x = x;
    }
  
    set Y(y) {
      this.y = y;
    }
     
    click() {
      this.isSelected = !this.isSelected;
    }
  
    draw() {
      if (this.isSelected)
        fill(this.selectedColor[0], this.selectedColor[1], this.selectedColor[2]);
      else
        fill(this.color[0], this.color[1], this.color[2]);
      circle(this.x, this.y, this.d);
    }
  }