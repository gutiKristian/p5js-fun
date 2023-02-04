class Seminar5Task extends Task {
    constructor() {
      super();
      this.taskNumber = 5;
      this.points = null;
      console.log("Task 5, Delaunay triangulation");
    }

    compute(canvas) {

      
      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    show() {
        textSize(64);
        let s = 'You ran task 5, but there\'s nothing in it :((';
        fill(50);
        text(s, 50, config.canvas.height / 2, config.canvas.width, config.canvas.height);
    }
}
  