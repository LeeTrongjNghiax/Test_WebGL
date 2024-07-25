let TETRAHEDRON_FACES = [];

TETRAHEDRON_FACES.push(
  new Face(
    [
      new Vertex(new Position(SCALE, SCALE, SCALE),   new Color(...YELLOW)),
      new Vertex(new Position(-SCALE, -SCALE, SCALE), new Color(...YELLOW)),
      new Vertex(new Position(SCALE, -SCALE, -SCALE), new Color(...YELLOW)),
    ],
    new Position(),
    new Color(...YELLOW)
  ), 
  new Face(
    [
      new Vertex(new Position(SCALE, SCALE, SCALE),   new Color(...RED)),
      new Vertex(new Position(-SCALE, -SCALE, SCALE), new Color(...RED)),
      new Vertex(new Position(-SCALE, SCALE, -SCALE), new Color(...RED)),
    ],
    new Position(),
    new Color(...RED)
  ), 
  new Face(
    [
      new Vertex(new Position(SCALE, SCALE, SCALE),   new Color(...GREEN)),
      new Vertex(new Position(SCALE, -SCALE, -SCALE), new Color(...GREEN)),
      new Vertex(new Position(-SCALE, SCALE, -SCALE), new Color(...GREEN)),
    ],
    new Position(),
    new Color(...GREEN)
  ), 
  new Face(
    [
      new Vertex(new Position(-SCALE, -SCALE, SCALE), new Color(...BLUE)),
      new Vertex(new Position(SCALE, -SCALE, -SCALE), new Color(...BLUE)),
      new Vertex(new Position(-SCALE, SCALE, -SCALE), new Color(...BLUE)),
    ],
    new Position(),
    new Color(...BLUE)
  ), 
);


let TETRAHEDRON_VERTEXES = [];

for (let i = 0; i < TETRAHEDRON_FACES.length; i++) 
  TETRAHEDRON_VERTEXES.push(...TETRAHEDRON_FACES[i].toString()); 

let TETRAHEDRON_INDEXES = [];

for (let i = 0; i < TETRAHEDRON_FACES.length * NUM_OF_EDGE_IN_TRIANGLE; i += NUM_OF_EDGE_IN_TRIANGLE) 
  TETRAHEDRON_INDEXES.push(
    i, i + 1, i + 2,
    i, i + 2, i + 1,
    i + 1, i, i + 2,
  );

const TETRAHEDRON_INDEXES_LENGTH = TETRAHEDRON_INDEXES.length;

TETRAHEDRON_FACES = [];