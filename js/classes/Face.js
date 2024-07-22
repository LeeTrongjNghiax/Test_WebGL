class Face {
  constructor(
    vertexes = [], 
    absolute_position = new Position(),
    color = new Color()
  ) {
    this.vertexes = vertexes;
    this.absolute_position = absolute_position;
    this.color = color;
  }

  toString() {
    return [].concat(
      ...[].concat(
        ...this.vertexes.map(e => e.toString())
      )
    );
  }
}