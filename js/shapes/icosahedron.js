const ICOSAHEDRON_FACES = [];

ICOSAHEDRON_FACES.push(
  new Face(
    [
      new Vertex(new Position(0, -PHI * SCALE, -RECIPROCAL_OF_PHI * SCALE), new Color(...WHITE)),
      new Vertex(new Position(SCALE, -SCALE, -SCALE),                       new Color(...WHITE)),
      new Vertex(new Position(RECIPROCAL_OF_PHI * SCALE, 0, -PHI * SCALE),  new Color(...WHITE)),
      new Vertex(new Position(-RECIPROCAL_OF_PHI * SCALE, 0, -PHI * SCALE), new Color(...WHITE)),
      new Vertex(new Position(-SCALE, -SCALE, -SCALE),                      new Color(...WHITE)),
    ],
    new Position(),
    new Color(...WHITE)
  )
);

const a = [-PHI, -1, 0, 1, PHI];

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length; j++) {
    for (let k = 0; k < array.length; k++) {
      if (i == j || j == k || k == i)
        continue;

      // ICOSAHEDRON_FACES.push(
      //   new Face(
      //     [
      //       new Vertex(new Position(0, -PHI * SCALE, -RECIPROCAL_OF_PHI * SCALE), new Color(...WHITE)),
      //       new Vertex(new Position(SCALE, -SCALE, -SCALE),                       new Color(...WHITE)),
      //       new Vertex(new Position(RECIPROCAL_OF_PHI * SCALE, 0, -PHI * SCALE),  new Color(...WHITE)),
      //     ],
      //     new Position(),
      //     new Color(...WHITE)
      //   )
      // );
    }
  }
}