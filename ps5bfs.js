const HEIGHT = 400;
const WIDTH = 400;
// status "enums" used in BFS,DFS
const WHITE=0; // not reachable from init p. or not discovered yet
const GRAY=1; // reachable - not yet searched
const BLACK=2; // reachable from initial point and already searched

let p_manager, bfs;
let started=false;

class PointManager {
  constructor(columns = 20, rows = 20) {
    this.cols = columns;
    this.rows = rows;
    this.points = this.initPoints(WIDTH / this.cols, HEIGHT / this.rows);
    this.reset = false; // might be used to reset already visited nodes
    // in other words, delete the barrier
  }
  
  initPoints(w, h) {
    // w- width of point, h- height..
    let arr = new Array(this.rows);
    for (let y = 0; y < this.rows; y++) {
        arr[y] = new Array(this.cols);
        for (let x = 0; x < this.cols; x++) {
          // x * w -> shift the point so they don't overlap, same for y
          arr[y][x] = new Point(x * w, y * h, w, h);
        }
    }
    return arr;
  }
  
  show() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.points[y][x].show();
      }
    }
  }
  
  isInGrid(x, y) {
    // pixel coordinates
    return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
  }
  
  visit(x, y) {
    // visit this point
    // x and y are pixels not the points in the grid
    if (!this.isInGrid(x, y))
      return;
    x = Math.floor(x / this.cols);
    y = Math.floor(y / this.rows);
    this.points[y][x].isObstacle = !this.reset;
  }

  findNeighbours(point) {
    // point: Point
    // returns Array<Point>
    let neighbours = [];

    /*
      Neighbours of point (5,5)
      |(4,4)|  |(5,4)|  |(6,4)|
      |(4,5)| <|(5,5)|> |(6,5)|
      |(4,6)|  |(5,6)|  |(6,6)| 
    
    */

    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        let new_x = point.x + (point.width * x);
        let new_y = point.y + (point.height * y);
         
        if ((new_x == point.x && new_y == point.y) || !this.isInGrid(new_x, new_y))
          continue;
        new_x = Math.floor(new_x / this.cols);
        new_y = Math.floor(new_y / this.rows);
        if (this.points[new_y][new_x].isObstacle) // || is black || is gray, so we don't have to deal with these points twice as they were/are in the queue already
          continue;
        // finally push this neighbour :D
        neighbours.push(this.points[new_y][new_x]);          
      }
    }
    return neighbours;
  }
  
}

class Point {
  constructor(x, y, height, width) {
    // p5js properties
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // algo properties
    this.visitedStatus = WHITE;
    this.isObstacle = false;
    this.p = null;
    this.d = Infinity; // length of the path from this.p to this point
    
  }
  
  show() {
    if (this.isObstacle) {
      fill(0);      
    } else {
      switch(this.visitedStatus) {
        case WHITE:
          fill(255);
          break;
        case GRAY:
          fill(150);
          break;
        case BLACK:
          fill(80);
          break;
        default:
          fill(255, 204, 0);
          break;  
      }      
    }
    stroke(0);
    rect(this.x, this.y, this.width - 1, this.height - 1);
  }
}

class BFS {
  constructor(pointManager, start, end) {
    // start, end -> x,y coords within cols and rows
    this.pMan = pointManager;
    this.s = this.pMan.points[start.y][start.x];
    this.e = this.pMan.points[end.y][end.x];
    this.isFound = false;
    this.steps = 0;
    this.queue = [];
    // bfs init steps
    this.s.d = 0;
    this.s.visitedStatus = GRAY;
    this.queue.push(this.s);
  }

  step() {

    if (this.queue.length == 0)
      this.isFound = true;
    
    if (this.isFound)
      return;
    // since we want to show how this algorithm works
    // instead of running and showing result we must step the running phase
    
    let current = this.queue.shift();
    let n = this.pMan.findNeighbours(current);
    
    for (let i = 0; i < n.length; i++) {
      if (n[i].visitedStatus == WHITE) {
        n[i].visitedStatus = GRAY;
        n[i].d = current.d + 1;
        n[i].p = current;
        
        if (n[i] == this.e) {
          this.isFound = true;
          // path found -> backtrack the points and show them on the grid
          let node = this.e;
          while (node != null) {
            // whatever except WHITE=0,GRAY=1,BLACK=2, we could have also created SHOW_PATH=3 and extend the swtich
            node.visitedStatus = -1;
            node = node.p;
          }
          return;
        }

        this.queue.push(n[i]);
      }
    }

    current.visitedStatus = BLACK;

  }

}
 
function mouseDragged(event) {
  p_manager.visit(event.clientX, event.clientY);
}


function setup() {
  createCanvas(WIDTH, HEIGHT);
  p_manager = new PointManager();
  bfs = new BFS(p_manager, {x: 0, y: 0}, {x: 19, y: 19});

  button = createButton('Run BFS');
  button.position(HEIGHT + 10, 0);
  button.mousePressed(() => {started=true;});

}

function draw() {
  background(255);
  p_manager.show();
  if (started)
    bfs.step();
}