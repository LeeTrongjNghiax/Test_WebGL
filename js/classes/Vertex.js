class Vertex {
  constructor(
    relative_position = new Position(), 
    color = new Color(), 
    absolute_position = new Position(), 
    color_name = ``
  ) {
    this.relative_position = relative_position;
    this.color = color;
    this.absolute_position = absolute_position;
    this.color_name = color_name;
  }

  toString() {
    return [
      ...this.relative_position.toString(), 
      ...this.color.toString()
    ]
  }
}