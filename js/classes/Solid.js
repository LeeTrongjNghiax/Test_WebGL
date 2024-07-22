class Solid {
  constructor(
    faces = [],
    absolute_position = new Position()
  ) {
    this.faces = faces;
    this.absolute_position = absolute_position;
  }

  toString() {
    return [].concat(...this.faces.map(e => e.toString()));
  }
}