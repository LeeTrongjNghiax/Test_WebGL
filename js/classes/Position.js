class Position {
  constructor(x = 0., y = 0., z = 0.) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getLength() {
    return Math.hypot(this.x, this.y, this.z);
  }

  toString() {
    return [this.x, this.y, this.z];
  }
}