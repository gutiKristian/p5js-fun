class Seminar3Task extends Task {
    constructor() {
      super();
      this.taskNumber = 3;
      console.log("Task 3, Triangulation");
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
  