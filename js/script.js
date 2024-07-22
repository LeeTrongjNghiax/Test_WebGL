const PHI = (1 + 5 ** (1 / 2)) / 2;
const RECIPROCAL_OF_PHI = 1 / PHI;
const ALPHA = 1.;

const WHITE       = [1., 1., 1.];
const GREEN       = [0., 1., 0.];
const RED         = [1., 0., 0.];
const BLUE        = [0., 0., 1.];
const YELLOW      = [1., 1., 0.];
const PURPLE      = [160 / 255,  32 / 255, 240 / 255];
const LIGHT_GREEN = [144 / 255, 238 / 255, 144 / 255];
const ORANGE      = [1., .5, 0.];
const LIGHT_BLUE  = [173 / 255, 216 / 255, 230 / 255];
const BEIGE       = [245 / 255, 245 / 255, 220 / 255];
const PINK        = [255 / 255, 192 / 255, 203 / 255];
const GRAY        = [.5, .5, .5];

async function getShaderTexts(
  vertexShaderLocation = `../shaders/new/vertex.glsl`,
  fragmentShaderLocation = `../shaders/new/fragment.glsl`
) {
  const VERTEX_SHADER_RESPONSE = await fetch(vertexShaderLocation);

  if (VERTEX_SHADER_RESPONSE.status == 200) {
    const VERTEX_SHADER_RESPONSE = await fetch(vertexShaderLocation);
    const VERTEX_SHADER_TEXT = await VERTEX_SHADER_RESPONSE.text();

    const FRAGMENT_SHADER_RESPONSE = await fetch(fragmentShaderLocation);
    const FRAGMENT_SHADER_TEXT = await FRAGMENT_SHADER_RESPONSE.text();

    return { VERTEX_SHADER_TEXT, FRAGMENT_SHADER_TEXT }
  } else {
    const VERTEX_SHADER_RESPONSE = await fetch(vertexShaderLocation.substring(3));
    const VERTEX_SHADER_TEXT = await VERTEX_SHADER_RESPONSE.text();

    const FRAGMENT_SHADER_RESPONSE = await fetch(fragmentShaderLocation.substring(3));
    const FRAGMENT_SHADER_TEXT = await FRAGMENT_SHADER_RESPONSE.text();

    return { VERTEX_SHADER_TEXT, FRAGMENT_SHADER_TEXT }
  }
}

window.onload = async () => {
  const CANVAS = document.querySelector(`#cv`);

  const resetCanvasDimension = () => {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
  }

  resetCanvasDimension();

  const GL =
    CANVAS.getContext(`webgl2`, {premultipliedAlpha: false} ) ||
    CANVAS.getContext(`webgl`, {premultipliedAlpha: false} ) ||
    CANVAS.getContext(`experimental-webgl`, {premultipliedAlpha: false} );
  
  if (!GL) {
    console.error(`Your browser does not support WebGL`);
    return;
  }

  GL.clearColor(0.01, 0.01, 0.01, 1.);
  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);

  GL.enable(GL.DEPTH_TEST);
  GL.enable(GL.CULL_FACE);
  GL.enable(GL.BLEND);
  GL.frontFace(GL.CCW);
  GL.cullFace(GL.BACK);
  GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

  const VERTEX_SHADER = GL.createShader(GL.VERTEX_SHADER);
  const FRAGMENT_SHADER = GL.createShader(GL.FRAGMENT_SHADER);

  let VERTEX_SHADER_LOCATION = `../shaders/new/vertex.glsl`;
  let FRAGMENT_SHADER_LOCATION = `../shaders/new/fragment.glsl`;

  if (GL instanceof WebGLRenderingContext) {
    VERTEX_SHADER_LOCATION = `../shaders/old/vertex.glsl`;
    FRAGMENT_SHADER_LOCATION = `../shaders/old/fragment.glsl`;
  }

  const { VERTEX_SHADER_TEXT, FRAGMENT_SHADER_TEXT } = await getShaderTexts(VERTEX_SHADER_LOCATION, FRAGMENT_SHADER_LOCATION);
  
  GL.shaderSource(VERTEX_SHADER, VERTEX_SHADER_TEXT);
  GL.shaderSource(FRAGMENT_SHADER, FRAGMENT_SHADER_TEXT);

  GL.compileShader(VERTEX_SHADER);
  GL.compileShader(FRAGMENT_SHADER);

  if (!GL.getShaderParameter(VERTEX_SHADER, GL.COMPILE_STATUS)) {
    console.error(`Error compiling vertex shader: `, GL.getShaderInfoLog(VERTEX_SHADER));
    return;
  }

  if (!GL.getShaderParameter(FRAGMENT_SHADER, GL.COMPILE_STATUS)) {
    console.error(`Error compiling fragment shader: `, GL.getShaderInfoLog(FRAGMENT_SHADER));
    return;
  }

  const PROGRAM = GL.createProgram();
  GL.attachShader(PROGRAM, VERTEX_SHADER);
  GL.attachShader(PROGRAM, FRAGMENT_SHADER);

  GL.linkProgram(PROGRAM);

  if (!GL.getProgramParameter(PROGRAM, GL.LINK_STATUS)) {
    console.error(`Error linking program: `, GL.getProgramInfoLog(PROGRAM));
    return;
  }

  GL.validateProgram(PROGRAM);

  if (!GL.getProgramParameter(PROGRAM, GL.VALIDATE_STATUS)) {
    console.error(`Error validating program: `, GL.getProgramInfoLog(PROGRAM));
    return;
  }

  const DODECAHEDRON_VERTEXES = [
    // Bottom Face (White)
     0,                 -PHI,               -RECIPROCAL_OF_PHI, ...WHITE, ALPHA, 
     1,                 -1,                 -1,                 ...WHITE, ALPHA, 
     RECIPROCAL_OF_PHI,  0,                 -PHI,               ...WHITE, ALPHA, 
    -RECIPROCAL_OF_PHI,  0,                 -PHI,               ...WHITE, ALPHA, 
    -1,                 -1,                 -1,                 ...WHITE, ALPHA, 
    
    // 1st Layer 1st Face (Green)
     0,                 PHI,                -RECIPROCAL_OF_PHI, ...GREEN, ALPHA, 
     1,                 1,                  -1,                 ...GREEN, ALPHA, 
     RECIPROCAL_OF_PHI, 0,                  -PHI,               ...GREEN, ALPHA, 
    -RECIPROCAL_OF_PHI, 0,                  -PHI,               ...GREEN, ALPHA, 
    -1,                 1,                  -1,                 ...GREEN, ALPHA, 
    
    // 1st Layer 2nd Face (Red)
     PHI,                RECIPROCAL_OF_PHI,  0,                 ...RED, ALPHA, 
     PHI,               -RECIPROCAL_OF_PHI,  0,                 ...RED, ALPHA, 
     1,                 -1,                 -1,                 ...RED, ALPHA, 
     RECIPROCAL_OF_PHI,  0,                 -PHI,               ...RED, ALPHA, 
     1,                  1,                 -1,                 ...RED, ALPHA, 
     
    // 1st Layer 3rd Face (Blue)
     1,                 -1,                  1,                 ...BLUE, ALPHA, 
     0,                 -PHI,                RECIPROCAL_OF_PHI, ...BLUE, ALPHA, 
     0,                 -PHI,               -RECIPROCAL_OF_PHI, ...BLUE, ALPHA, 
     1,                 -1,                 -1,                 ...BLUE, ALPHA, 
     PHI,               -RECIPROCAL_OF_PHI,  0,                 ...BLUE, ALPHA, 
     
    // 1st Layer 4th Face (Yellow)
     -1,                -1,                  1,                 ...YELLOW, ALPHA, 
     -PHI,              -RECIPROCAL_OF_PHI,  0,                 ...YELLOW, ALPHA, 
     -1,                -1,                 -1,                 ...YELLOW, ALPHA, 
      0,                -PHI,               -RECIPROCAL_OF_PHI, ...YELLOW, ALPHA, 
      0,                -PHI,                RECIPROCAL_OF_PHI, ...YELLOW, ALPHA, 

    // 1st Layer 5th Face (Purple)
    -PHI,                RECIPROCAL_OF_PHI,  0,                 ...PURPLE, ALPHA, 
    -1,                  1,                 -1,                 ...PURPLE, ALPHA, 
    -RECIPROCAL_OF_PHI,  0,                 -PHI,               ...PURPLE, ALPHA, 
    -1,                 -1,                 -1,                 ...PURPLE, ALPHA, 
    -PHI,               -RECIPROCAL_OF_PHI,  0,                 ...PURPLE, ALPHA, 

    // 2nd Layer 1st Face (Light Green)
     0,                 -PHI,                RECIPROCAL_OF_PHI, ...LIGHT_GREEN, ALPHA, 
    -1,                 -1,                  1,                 ...LIGHT_GREEN, ALPHA, 
    -RECIPROCAL_OF_PHI,  0,                  PHI,               ...LIGHT_GREEN, ALPHA, 
     RECIPROCAL_OF_PHI,  0,                  PHI,               ...LIGHT_GREEN, ALPHA, 
     1,                 -1,                  1,                 ...LIGHT_GREEN, ALPHA, 
     
    // 2nd Layer 2nd Face (Orange)
    -PHI,               -RECIPROCAL_OF_PHI,  0,                 ...ORANGE, ALPHA, 
    -PHI,                RECIPROCAL_OF_PHI,  0,                 ...ORANGE, ALPHA, 
    -1,                  1,                  1,                 ...ORANGE, ALPHA, 
    -RECIPROCAL_OF_PHI,  0,                  PHI,               ...ORANGE, ALPHA, 
    -1,                 -1,                  1,                 ...ORANGE, ALPHA, 
    
    // 2nd Layer 3rd Face (Light Blue)
    -1,                  1,                 -1,                 ...LIGHT_BLUE, ALPHA, 
    -PHI,                RECIPROCAL_OF_PHI,  0,                 ...LIGHT_BLUE, ALPHA, 
    -1,                  1,                  1,                 ...LIGHT_BLUE, ALPHA, 
     0,                  PHI,                RECIPROCAL_OF_PHI, ...LIGHT_BLUE, ALPHA, 
     0,                  PHI,               -RECIPROCAL_OF_PHI, ...LIGHT_BLUE, ALPHA, 
     
    // 2nd Layer 4th Face (Beige)
     1,                  1,                 -1,                 ...BEIGE, ALPHA, 
     0,                  PHI,               -RECIPROCAL_OF_PHI, ...BEIGE, ALPHA, 
     0,                  PHI,                RECIPROCAL_OF_PHI, ...BEIGE, ALPHA, 
     1,                  1,                  1,                 ...BEIGE, ALPHA, 
     PHI,                RECIPROCAL_OF_PHI,  0,                 ...BEIGE, ALPHA, 
     
    // 2nd Layer 5th Face (Pink)
     PHI,               -RECIPROCAL_OF_PHI,  0,                 ...PINK, ALPHA, 
     1,                 -1,                  1,                 ...PINK, ALPHA, 
     RECIPROCAL_OF_PHI,  0,                  PHI,               ...PINK, ALPHA, 
     1,                  1,                  1,                 ...PINK, ALPHA, 
     PHI,                RECIPROCAL_OF_PHI,  0,                 ...PINK, ALPHA, 
     
    // Top Face (Gray)
     0,                  PHI,                RECIPROCAL_OF_PHI, ...GRAY, ALPHA, 
     1,                  1,                  1,                 ...GRAY, ALPHA, 
     RECIPROCAL_OF_PHI,  0,                  PHI,               ...GRAY, ALPHA, 
    -RECIPROCAL_OF_PHI,  0,                  PHI,               ...GRAY, ALPHA, 
    -1,                  1,                  1,                 ...GRAY, ALPHA, 
  ];

  const DODECAHEDRON_INDEXES = [
    // Bottom Face
    0, 1, 2, 
    0, 2, 1, 
    0, 3, 4, 
    0, 4, 3, 
    0, 2, 3, 
    0, 3, 2, 

    // 1st Layer 1st
    5 + 0, 5 + 1, 5 + 2, 
    5 + 0, 5 + 2, 5 + 1, 
    5 + 0, 5 + 3, 5 + 4, 
    5 + 0, 5 + 4, 5 + 3, 
    5 + 0, 5 + 2, 5 + 3, 
    5 + 0, 5 + 3, 5 + 2, 

    // 1st Layer 2nd
    10 + 0, 10 + 1, 10 + 2, 
    10 + 0, 10 + 2, 10 + 1, 
    10 + 0, 10 + 3, 10 + 4, 
    10 + 0, 10 + 4, 10 + 3, 
    10 + 0, 10 + 2, 10 + 3, 
    10 + 0, 10 + 3, 10 + 2, 

    // 1st Layer 3rd
    15 + 0, 15 + 1, 15 + 2, 
    15 + 0, 15 + 2, 15 + 1, 
    15 + 0, 15 + 3, 15 + 4, 
    15 + 0, 15 + 4, 15 + 3, 
    15 + 0, 15 + 2, 15 + 3, 
    15 + 0, 15 + 3, 15 + 2, 

    // 1st Layer 4th
    20 + 0, 20 + 1, 20 + 2, 
    20 + 0, 20 + 2, 20 + 1, 
    20 + 0, 20 + 3, 20 + 4, 
    20 + 0, 20 + 4, 20 + 3, 
    20 + 0, 20 + 2, 20 + 3, 
    20 + 0, 20 + 3, 20 + 2, 

    // 1st Layer 5th
    25 + 0, 25 + 1, 25 + 2, 
    25 + 0, 25 + 2, 25 + 1, 
    25 + 0, 25 + 3, 25 + 4, 
    25 + 0, 25 + 4, 25 + 3, 
    25 + 0, 25 + 2, 25 + 3, 
    25 + 0, 25 + 3, 25 + 2, 

    // 2nd Layer 1st
    30 + 0, 30 + 1, 30 + 2, 
    30 + 0, 30 + 2, 30 + 1, 
    30 + 0, 30 + 3, 30 + 4, 
    30 + 0, 30 + 4, 30 + 3, 
    30 + 0, 30 + 2, 30 + 3, 
    30 + 0, 30 + 3, 30 + 2, 

    // 2nd Layer 2nd
    35 + 0, 35 + 1, 35 + 2, 
    35 + 0, 35 + 2, 35 + 1, 
    35 + 0, 35 + 3, 35 + 4, 
    35 + 0, 35 + 4, 35 + 3, 
    35 + 0, 35 + 2, 35 + 3, 
    35 + 0, 35 + 3, 35 + 2, 
    
    // 2nd Layer 3rd
    40 + 0, 40 + 1, 40 + 2, 
    40 + 0, 40 + 2, 40 + 1, 
    40 + 0, 40 + 3, 40 + 4, 
    40 + 0, 40 + 4, 40 + 3, 
    40 + 0, 40 + 2, 40 + 3, 
    40 + 0, 40 + 3, 40 + 2, 

    // 2nd Layer 4th
    45 + 0, 45 + 1, 45 + 2, 
    45 + 0, 45 + 2, 45 + 1, 
    45 + 0, 45 + 3, 45 + 4, 
    45 + 0, 45 + 4, 45 + 3, 
    45 + 0, 45 + 2, 45 + 3, 
    45 + 0, 45 + 3, 45 + 2, 

    // 2nd Layer 5th
    50 + 0, 50 + 1, 50 + 2, 
    50 + 0, 50 + 2, 50 + 1, 
    50 + 0, 50 + 3, 50 + 4, 
    50 + 0, 50 + 4, 50 + 3, 
    50 + 0, 50 + 2, 50 + 3, 
    50 + 0, 50 + 3, 50 + 2, 

    // Top
    55 + 0, 55 + 1, 55 + 2, 
    55 + 0, 55 + 2, 55 + 1, 
    55 + 0, 55 + 3, 55 + 4, 
    55 + 0, 55 + 4, 55 + 3, 
    55 + 0, 55 + 2, 55 + 3, 
    55 + 0, 55 + 3, 55 + 2, 
  ];

  const DODECAHEDRON_VERTEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, DODECAHEDRON_VERTEX_BUFFER_OBJECT);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(DODECAHEDRON_VERTEXES), GL.STATIC_DRAW);

  const DODECAHEDRON_INDEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DODECAHEDRON_INDEX_BUFFER_OBJECT);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(DODECAHEDRON_INDEXES), GL.STATIC_DRAW);

  const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertPosition`);
  const COLOR_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertColor`);

  GL.vertexAttribPointer(
    POSITION_ATTRIBUTE_LOCATION,
    3, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );
  GL.vertexAttribPointer(
    COLOR_ATTRIBUTE_LOCATION,
    4, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    7 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );

  GL.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);
  GL.enableVertexAttribArray(COLOR_ATTRIBUTE_LOCATION);

  GL.useProgram(PROGRAM);

  const UNIFORM_MAT_LOCATION_WORLD = GL.getUniformLocation(PROGRAM, `mWorld`);
  const UNIFORM_MAT_LOCATION_VIEW = GL.getUniformLocation(PROGRAM, `mView`);
  const UNIFORM_MAT_LOCATION_PROJECTION = GL.getUniformLocation(PROGRAM, `mProjection`);

  let matrixWorld = identity();
  let matrixView = identity();
  let matrixProjection = identity();
  lookAt(matrixView, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
  perspective(matrixProjection, Math.PI * 1 / 3, CANVAS.width / CANVAS.height, 0.1, 1000.0);

  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_WORLD, GL.FALSE, matrixWorld);
  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_VIEW, GL.FALSE, matrixView);
  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_PROJECTION, GL.FALSE, matrixProjection);

  let matrixIdentity = identity();

  let matrixRotationX = new Float32Array(16);
  let matrixRotationY = new Float32Array(16);

  let angle = 0;

  const loop = () => {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;

    rotate(matrixRotationY, matrixIdentity, angle, [0, 1, 0]);
    rotate(matrixRotationX, matrixIdentity, angle / 4, [1, 0, 0]);

    multiply(matrixWorld, matrixRotationY, matrixRotationX);
    GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_WORLD, GL.FALSE, matrixWorld);

    resetCanvasDimension();

    GL.clearColor(0.01, 0.01, 0.01, 1.);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);

    GL.drawArrays(GL.TRIANGLES, 0, 3);
    GL.drawElements(GL.TRIANGLES, DODECAHEDRON_INDEXES.length, GL.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop); 
  }

  loop();

}