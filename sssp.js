import { Point, PointManager } from "./ps5bfs";

class CPointManager extends PointManager {
    createPoint(x, y) {
        return new CPoint(x * this.w, y * this.h, this.w, this.h);
    }
}


class CPoint extends Point {

}
