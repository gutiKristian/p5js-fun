class Seminar4Task extends Task {
    constructor() {
      super();
      this.taskNumber = 4;
      this.points = null;
      console.log("Task 4, Orthogonal searching");
    }

    buildKdTree(points, depth, parentNode) {
      
      if (points.length  == 1) {
        let node = new KdNode(points[0].Vector, depth, parentNode);
        node.point = points[0]; 
        return node;
      }      

      // Not very optimal...but if necessary median can be found in O(n), median of medians
      if (depth % 2 == 0) {
        // y split
        points.sort((a, b) => a.y - b.y);
      } else {
        // x split
        points.sort((a, b) => a.x - b.x);
      }

      let mid_index = Math.round(points.length / 2 - 1);
      let thisNode = new KdNode(points[mid_index].Vector, depth, parentNode);
      thisNode.left = this.buildKdTree(points.slice(0, mid_index + 1), depth + 1, thisNode);
      thisNode.right = this.buildKdTree(points.slice(mid_index + 1, points.length), depth + 1, thisNode);

      return thisNode;
    }

    compute(canvas) {

      let tree = new KdTree();
      let depth = 1;

      tree.root = this.buildKdTree(canvas.points, depth, null);
      this.result = tree;
      console.log("DONE");
      this.isDone = true;
      console.log(this.result);
    }

    drawTree(node, x_min, x_max, y_min, y_max) {

      // if leaf -- return -- leaves are drawn by canvas
      if (node.point != null)
        return;

      if (node.depth % 2 == 0) {
        // constant y
        line(x_min, node.vector.y, x_max, node.vector.y);
        this.drawTree(node.left, x_min, x_max, y_min, node.vector.y);
        this.drawTree(node.right, x_min, x_max, node.vector.y, y_max);

      } else {
        // constant x
        line(node.vector.x, y_min, node.vector.x, y_max);
        this.drawTree(node.left, x_min, node.vector.x, y_min, y_max);
        this.drawTree(node.right, node.vector.x, x_max, y_min, y_max);
      }

    }

    show() {
      this.drawTree(this.result.root, 0, config.canvas.width, 0, config.canvas.height);  
    }
}


class KdNode {
    constructor(vector, depth, parentNode) {
      this.vector = vector
      this.point = null; // leaf has initialized point
      this.k = 2;
      this.depth = depth;
      this.id = null;
      this.parent = parentNode;
      this.left = null;
      this.right = null;
    }
}

class KdTree {
    constructor() {
        this.root = null;
    }
}