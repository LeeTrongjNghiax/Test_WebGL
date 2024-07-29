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

  toString2() {
    return [].concat(
      ...[].concat(
        ...this.vertexes.map(e => {
          return e.toString().concat(...this.getNormalVector())
        })
      )
    );
  }

  getNormalVector() {
    const VECTOR1 = new Float32Array(3);
    VECTOR1[0] = this.vertexes[1].relative_position.x - this.vertexes[0].relative_position.x;
    VECTOR1[1] = this.vertexes[1].relative_position.y - this.vertexes[0].relative_position.y;
    VECTOR1[2] = this.vertexes[1].relative_position.z - this.vertexes[0].relative_position.z;

    const VECTOR2 = new Float32Array(3);
    VECTOR2[0] = this.vertexes[2].relative_position.x - this.vertexes[0].relative_position.x;
    VECTOR2[1] = this.vertexes[2].relative_position.y - this.vertexes[0].relative_position.y;
    VECTOR2[2] = this.vertexes[2].relative_position.z - this.vertexes[0].relative_position.z;

    const CROSS_PRODUCT_VECTOR = new Float32Array(3);
    vec3.cross(CROSS_PRODUCT_VECTOR, VECTOR1, VECTOR2);

    if ( CROSS_PRODUCT_VECTOR[0] < glMatrix.EPSILON)
      CROSS_PRODUCT_VECTOR[0] = 0;

    if ( CROSS_PRODUCT_VECTOR[1] < glMatrix.EPSILON)
      CROSS_PRODUCT_VECTOR[1] = 0;

    if ( CROSS_PRODUCT_VECTOR[2] < glMatrix.EPSILON)
      CROSS_PRODUCT_VECTOR[2] = 0;

    return CROSS_PRODUCT_VECTOR;
  }
}