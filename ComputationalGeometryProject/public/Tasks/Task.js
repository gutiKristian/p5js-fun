// laod tasks into array ? or activate some task ? diff func ? active task will be displayed
class Task {
    constructor() {
      // callbacks
      this.result = [];
      this.isDone = false;
      this.taskNumber = -1;
    }
  
    compute(canvas) {
      /*
        Accepts canvas, which contains set of points and upon the calculation will be done.
      */
      throw new Error("Not implemented!");
    }
  
    show() {
      /*
        Custom show method for each task.
        Display the result of the computation.
      */
      throw new Error("Not implemented!");
    }
  }