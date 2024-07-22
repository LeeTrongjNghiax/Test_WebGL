let FACES = [];

FACES.push(
  // Bottom Face (White)
  new Face(
    [
      new Vertex(new Position(0, -PHI, -RECIPROCAL_OF_PHI), new Color(...WHITE)),
      new Vertex(new Position(1, -1, -1),                   new Color(...WHITE)),
      new Vertex(new Position(RECIPROCAL_OF_PHI, 0, -PHI),  new Color(...WHITE)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0, -PHI), new Color(...WHITE)),
      new Vertex(new Position(-1, -1, -1),                  new Color(...WHITE)),
    ],
    new Position(),
    new Color(...WHITE)
  ), 

  // 1st Layer 1st Face (Green)
  new Face(
    [
      new Vertex(new Position(0, PHI, -RECIPROCAL_OF_PHI),  new Color(...GREEN)),
      new Vertex(new Position(1, 1, -1),                    new Color(...GREEN)),
      new Vertex(new Position(RECIPROCAL_OF_PHI, 0, -PHI),  new Color(...GREEN)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0, -PHI), new Color(...GREEN)),
      new Vertex(new Position(-1, 1, -1),                   new Color(...GREEN)),
    ],
    new Position(),
    new Color(...GREEN)
  ), 

  // 1st Layer 2nd Face (Red)
  new Face(
    [
      new Vertex(new Position(PHI, RECIPROCAL_OF_PHI, 0),   new Color(...RED)),
      new Vertex(new Position(PHI, -RECIPROCAL_OF_PHI, 0),  new Color(...RED)),
      new Vertex(new Position(1, -1, -1),                   new Color(...RED)),
      new Vertex(new Position(RECIPROCAL_OF_PHI, 0, -PHI),  new Color(...RED)),
      new Vertex(new Position(1, 1, -1),                    new Color(...RED)),
    ],
    new Position(),
    new Color(...RED)
  ), 

  // 1st Layer 3rd Face (Blue)
  new Face(
    [
      new Vertex(new Position(1, -1, 1),                    new Color(...BLUE)),
      new Vertex(new Position(0, -PHI, RECIPROCAL_OF_PHI),  new Color(...BLUE)),
      new Vertex(new Position(0, -PHI, -RECIPROCAL_OF_PHI), new Color(...BLUE)),
      new Vertex(new Position(1, -1, -1),                   new Color(...BLUE)),
      new Vertex(new Position(PHI, -RECIPROCAL_OF_PHI, 0),  new Color(...BLUE)),
    ],
    new Position(),
    new Color(...BLUE)
  ), 
  
  // 1st Layer 4th Face (Yellow)
  new Face(
    [
      new Vertex(new Position(-1, -1, 1),                   new Color(...YELLOW)),
      new Vertex(new Position(-PHI, -RECIPROCAL_OF_PHI, 0), new Color(...YELLOW)),
      new Vertex(new Position(-1, -1, -1),                  new Color(...YELLOW)),
      new Vertex(new Position(0, -PHI, -RECIPROCAL_OF_PHI), new Color(...YELLOW)),
      new Vertex(new Position(0, -PHI, RECIPROCAL_OF_PHI),  new Color(...YELLOW)),
    ],
    new Position(),
    new Color(...YELLOW)
  ), 
  
  // 1st Layer 5th Face (Purple)
  new Face(
    [
      new Vertex(new Position(-PHI, RECIPROCAL_OF_PHI, 0),  new Color(...PURPLE)),
      new Vertex(new Position(-1, 1, -1),                   new Color(...PURPLE)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0, -PHI), new Color(...PURPLE)),
      new Vertex(new Position(-1, -1, -1),                  new Color(...PURPLE)),
      new Vertex(new Position(-PHI, -RECIPROCAL_OF_PHI, 0), new Color(...PURPLE)),
    ],
    new Position(),
    new Color(...PURPLE)
  ), 
  
  // 2nd Layer 1st Face (Light Green)
  new Face(
    [
      new Vertex(new Position(0, -PHI, RECIPROCAL_OF_PHI),  new Color(...LIGHT_GREEN)),
      new Vertex(new Position(-1, -1, 1),                   new Color(...LIGHT_GREEN)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0,  PHI), new Color(...LIGHT_GREEN)),
      new Vertex(new Position( RECIPROCAL_OF_PHI, 0,  PHI), new Color(...LIGHT_GREEN)),
      new Vertex(new Position(1, -1, 1),                    new Color(...LIGHT_GREEN)),
    ],
    new Position(),
    new Color(...LIGHT_GREEN)
  ), 
  
  // 2nd Layer 2nd Face (Orange)
  new Face(
    [
      new Vertex(new Position(-PHI, -RECIPROCAL_OF_PHI, 0), new Color(...ORANGE)),
      new Vertex(new Position(-PHI,  RECIPROCAL_OF_PHI, 0), new Color(...ORANGE)),
      new Vertex(new Position(-1, 1, 1),                    new Color(...ORANGE)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0,  PHI), new Color(...ORANGE)),
      new Vertex(new Position(-1, -1, 1),                   new Color(...ORANGE)),
    ],
    new Position(),
    new Color(...ORANGE)
  ), 
  
  // 2nd Layer 3rd Face (Light Blue)
  new Face(
    [
      new Vertex(new Position(-1, 1, -1),                  new Color(...LIGHT_BLUE)),
      new Vertex(new Position(-PHI, RECIPROCAL_OF_PHI, 0), new Color(...LIGHT_BLUE)),
      new Vertex(new Position(-1, 1, 1),                   new Color(...LIGHT_BLUE)),
      new Vertex(new Position(0, PHI, RECIPROCAL_OF_PHI),  new Color(...LIGHT_BLUE)),
      new Vertex(new Position(0, PHI, -RECIPROCAL_OF_PHI), new Color(...LIGHT_BLUE)),
    ],
    new Position(),
    new Color(...LIGHT_BLUE)
  ), 
  
  // 2nd Layer 4th Face (Beige)
  new Face(
    [
      new Vertex(new Position(1, 1, -1),                   new Color(...BEIGE)),
      new Vertex(new Position(0, PHI, -RECIPROCAL_OF_PHI), new Color(...BEIGE)),
      new Vertex(new Position(0, PHI, RECIPROCAL_OF_PHI),  new Color(...BEIGE)),
      new Vertex(new Position(1, 1, 1),                    new Color(...BEIGE)),
      new Vertex(new Position(PHI, RECIPROCAL_OF_PHI, 0),  new Color(...BEIGE)),
    ],
    new Position(),
    new Color(...LIGHT_BLUE)
  ), 
  
  // 2nd Layer 5th Face (Pink)
  new Face(
    [
      new Vertex(new Position(PHI, -RECIPROCAL_OF_PHI, 0), new Color(...PINK)),
      new Vertex(new Position(1, -1, 1),                   new Color(...PINK)),
      new Vertex(new Position(RECIPROCAL_OF_PHI, 0, PHI),  new Color(...PINK)),
      new Vertex(new Position(1, 1, 1),                    new Color(...PINK)),
      new Vertex(new Position(PHI, RECIPROCAL_OF_PHI, 0),  new Color(...PINK)),
    ],
    new Position(),
    new Color(...PINK)
  ), 
  
  // Top Face (Gray)
  new Face(
    [
      new Vertex(new Position(0, PHI, RECIPROCAL_OF_PHI),  new Color(...GRAY)),
      new Vertex(new Position(1, 1, 1),                    new Color(...GRAY)),
      new Vertex(new Position(RECIPROCAL_OF_PHI, 0, PHI),  new Color(...GRAY)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI, 0, PHI), new Color(...GRAY)),
      new Vertex(new Position(-1, 1, 1),                   new Color(...GRAY)),
    ],
    new Position(),
    new Color(...GRAY)
  ), 
);

const DODECAHEDRON_VERTEXES = [];

for (let i = 0; i < FACES.length; i++) 
  DODECAHEDRON_VERTEXES.push(...FACES[i].toString()); 

const DODECAHEDRON_INDEXES = [];

for (let i = 0; i < FACES.length * NUM_OF_EDGE_IN_PENTAGON; i += NUM_OF_EDGE_IN_PENTAGON) 
  DODECAHEDRON_INDEXES.push(
    i, i + 1, i + 2,
    i, i + 2, i + 1,
    i, i + 3, i + 4,
    i, i + 4, i + 3,
    i, i + 2, i + 3,
    i, i + 3, i + 2,
  );