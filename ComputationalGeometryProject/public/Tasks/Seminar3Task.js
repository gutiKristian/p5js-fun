class Seminar1Task extends Task {
    constructor() {
      super();
      console.log("Task 1, Convex Hull");
    }

    compute(canvas) {

      
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
  