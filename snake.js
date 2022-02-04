const WIDTH=800;
const HEIGHT=800;
const grd = 20;
let snake;

class Snake {
  
  constructor() {
    this.direction = {x: 0, y: 1};
    this.speed = 1;
    this.body = [{x: WIDTH/2, y: HEIGHT/2}];
    this.spawn = 0;
    this.apple = {x: 20, y: 20}; // then generated randomly
  }
  
  draw() {
    // snake
    for (let i = 0; i < this.body.length; i++) {
      fill(255);
      stroke(0);
      rect(this.body[i].x, this.body[i].y, grd, grd);
    }
    // apple
    fill(255,0,0);
    stroke(0);
    rect(this.apple.x, this.apple.y, grd, grd);
  }

  eat() {
    // after an apple has been eaten we spawn cell on the tail, give it the coordinates of the
    // last one, therefore it is spawn in the next frame -> in tne move section aaand generate new apple
    this.spawn += 1;
    this.apple.x = Math.floor(Math.random() * grd) * grd;
    this.apple.y = Math.floor(Math.random() * grd) * grd;
    // we should also consider checking the coords so we won't spawn apple in snake
  }

  collisionDet(head) {
    // directopm 0,0 will squeeze the snake, multiple rects in one point
    if (this.body.includes(head)) {
      this.direction = {x: 0, y: 0};
      return;
    }

    if (head.x == this.apple.x && head.y == this.apple.y)
      this.eat();
    
  }

  move() {
    // we compute new coords only for the head, the others follow their predecessors
    let new_x = this.body[0].x + this.direction.x * grd; 
    if (new_x < 0)
      new_x += WIDTH;
    else if (new_x >= WIDTH)
      new_x -= WIDTH;
    let new_y = this.body[0].y + this.direction.y * grd;
    if (new_y < 0)
      new_y += HEIGHT;
    else if(new_y >= HEIGHT)
      new_y -= HEIGHT;

    if (this.spawn > 0) {
      this.body.push(this.body[this.body.length - 1]);
      this.spawn -= 1;
    }

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = this.body[i - 1];
    }

    let coords = {x: new_x, y: new_y}

    this.collisionDet(coords);

    this.body[0] = coords;

  }
  
  
}

// snake must be initializd, which is done in setup
function keyPressed() {
  if (keyCode == UP_ARROW) {
    snake.direction = {x: 0, y: -1};
  } else if (keyCode == DOWN_ARROW) {
    snake.direction = {x: 0, y: 1};
  } else if (keyCode == LEFT_ARROW) {
    snake.direction = {x: -1, y: 0};
  } else if (keyCode == RIGHT_ARROW) {
    snake.direction = {x: 1, y: 0};
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  snake = new Snake();
  frameRate(15);
}

function draw() {
  background(220);
  snake.draw();
  snake.move();
}