const PHI = (1 + 5 ** (1 / 2)) / 2;
const RECIPROCAL_OF_PHI = 1 / PHI;

async function getShaderTexts(
  vertexShaderLocation   = `../shaders/new/vertex.glsl`,
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
  // const VERTEX_SHADER_TEXT = document.querySelector(`#vs`).innerHTML;
  // const FRAGMENT_SHADER_TEXT = document.querySelector(`#fs`).innerHTML;

  const CANVAS = document.querySelector(`#cv`);

  const resetCanvasDimension = () => {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
  }

  resetCanvasDimension();

  const GL =
    CANVAS.getContext(`webgl2`) ||
    CANVAS.getContext(`webgl`) ||
    CANVAS.getContext(`experimental-webgl`);
  
  if (!GL) {
    console.error(`Your browser does not support WebGL`);
    return;
  }

  GL.clearColor(0.01, 0.01, 0.01, 1.);
  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

  GL.enable(GL.DEPTH_TEST);
  GL.enable(GL.CULL_FACE);
  GL.frontFace(GL.CCW);
  GL.cullFace(GL.BACK);

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

  const CUBE_VERTEXES = [
    // X, Y, Z           R, G, B
		// Top
		-1.0,  1.0, -1.0,  1., 1., 1.,
		-1.0,  1.0,  1.0,  1., 1., 1.,
		 1.0,  1.0,  1.0,  1., 1., 1.,
		 1.0,  1.0, -1.0,  1., 1., 1.,

		// Left
		-1.0,  1.0,  1.0,  1., 165 / 255, 0.,
		-1.0, -1.0,  1.0,  1., 165 / 255, 0.,
		-1.0, -1.0, -1.0,  1., 165 / 255, 0.,
		-1.0,  1.0, -1.0,  1., 165 / 255, 0.,

		// Right
		 1.0,  1.0,  1.0,  1., 0., 0.,
		 1.0, -1.0,  1.0,  1., 0., 0.,
		 1.0, -1.0, -1.0,  1., 0., 0.,
		 1.0,  1.0, -1.0,  1., 0., 0.,

		// Front
		 1.0,  1.0,  1.0,  0., 1., 0.,
		 1.0, -1.0,  1.0,  0., 1., 0.,
		-1.0, -1.0,  1.0,  0., 1., 0.,
		-1.0,  1.0,  1.0,  0., 1., 0.,

		// Back
		 1.0,  1.0, -1.0,  0., 0., 1.,
		 1.0, -1.0, -1.0,  0., 0., 1.,
		-1.0, -1.0, -1.0,  0., 0., 1.,
		-1.0,  1.0, -1.0,  0., 0., 1.,

		// Bottom
		-1.0, -1.0, -1.0,  1., 1., 0.,
		-1.0, -1.0,  1.0,  1., 1., 0.,
		 1.0, -1.0,  1.0,  1., 1., 0.,
		 1.0, -1.0, -1.0,  1., 1., 0.,
	];

  const CUBE_INDEXES = [
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

  const TRIANGLE_VERTEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX_BUFFER_OBJECT);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(CUBE_VERTEXES), GL.STATIC_DRAW);

  const TRIANGLE_INDEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_INDEX_BUFFER_OBJECT);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(CUBE_INDEXES), GL.STATIC_DRAW);

  const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertPosition`);
  const COLOR_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertColor`);

  GL.vertexAttribPointer(
    POSITION_ATTRIBUTE_LOCATION,
    3, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );
  GL.vertexAttribPointer(
    COLOR_ATTRIBUTE_LOCATION,
    3, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
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
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

    GL.drawArrays(GL.TRIANGLES, 0, 3);
    GL.drawElements(GL.TRIANGLES, CUBE_INDEXES.length, GL.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop); 
  }

  loop();

}

// ( 1,  1,  1)
// ( 1,  1, -1)
// ( 1, -1,  1)
// ( 1, -1, -1)
// (-1,  1,  1)
// (-1,  1, -1)
// (-1, -1,  1)
// (-1, -1, -1)
// (0,  PHI,  RECIPROCAL_OF_PHI)
// (0,  PHI, -RECIPROCAL_OF_PHI)
// (0, -PHI,  RECIPROCAL_OF_PHI)
// (0, -PHI, -RECIPROCAL_OF_PHI)
// ( RECIPROCAL_OF_PHI, 0,  PHI)
// ( RECIPROCAL_OF_PHI, 0, -PHI)
// (-RECIPROCAL_OF_PHI, 0,  PHI)
// (-RECIPROCAL_OF_PHI, 0, -PHI)
// ( PHI,  RECIPROCAL_OF_PHI, 0)
// ( PHI, -RECIPROCAL_OF_PHI, 0)
// (-PHI,  RECIPROCAL_OF_PHI, 0)
// (-PHI, -RECIPROCAL_OF_PHI, 0)
