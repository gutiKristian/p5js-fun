class Seminar4Task extends Task {
    constructor() {
      super();
      this.taskNumber = 4;
      this.points = null;
      console.log("Task 4, Orthogonal searching");
    }

    compute(canvas) {

      
      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    show() {
        textSize(64);
        let s = 'You ran task 4, but there\'s nothing in it :((';
        fill(50);
        text(s, 50, config.canvas.height / 2, config.canvas.width, config.canvas.height);
    }
}
  