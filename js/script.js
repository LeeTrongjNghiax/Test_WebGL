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
  GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA, GL.ONE, GL.ZERO);

  const VERTEX_SHADER = GL.createShader(GL.VERTEX_SHADER);
  const FRAGMENT_SHADER = GL.createShader(GL.FRAGMENT_SHADER);

  let VERTEX_SHADER_LOCATION   = `../shaders/new/vertex.glsl`;
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

  const IMAGE = new Image();
  IMAGE.src = './../img/grate0_thumb.png';
  IMAGE.crossOrigin = 'anonymous';

  // var boxVertices = 
	// [ // X, Y, Z           U, V
	// 	// Top
	// 	-1.0, 1.0, -1.0,   0, 0,
	// 	-1.0, 1.0, 1.0,    0, 1,
	// 	1.0, 1.0, 1.0,     1, 1,
	// 	1.0, 1.0, -1.0,    1, 0,

	// 	// Left
	// 	-1.0, 1.0, 1.0,    0, 0,
	// 	-1.0, -1.0, 1.0,   1, 0,
	// 	-1.0, -1.0, -1.0,  1, 1,
	// 	-1.0, 1.0, -1.0,   0, 1,

	// 	// Right
	// 	1.0, 1.0, 1.0,    1, 1,
	// 	1.0, -1.0, 1.0,   0, 1,
	// 	1.0, -1.0, -1.0,  0, 0,
	// 	1.0, 1.0, -1.0,   1, 0,

	// 	// Front
	// 	1.0, 1.0, 1.0,    1, 1,
	// 	1.0, -1.0, 1.0,    1, 0,
	// 	-1.0, -1.0, 1.0,    0, 0,
	// 	-1.0, 1.0, 1.0,    0, 1,

	// 	// Back
	// 	1.0, 1.0, -1.0,    0, 0,
	// 	1.0, -1.0, -1.0,    0, 1,
	// 	-1.0, -1.0, -1.0,    1, 1,
	// 	-1.0, 1.0, -1.0,    1, 0,

	// 	// Bottom
	// 	-1.0, -1.0, -1.0,   1, 1,
	// 	-1.0, -1.0, 1.0,    1, 0,
	// 	1.0, -1.0, 1.0,     0, 0,
	// 	1.0, -1.0, -1.0,    0, 1,
	// ];

	// var boxIndices =
	// [
	// 	// Top
	// 	0, 1, 2,
	// 	0, 2, 3,

	// 	// Left
	// 	5, 4, 6,
	// 	6, 4, 7,

	// 	// Right
	// 	8, 9, 10,
	// 	8, 10, 11,

	// 	// Front
	// 	13, 12, 14,
	// 	15, 14, 12,

	// 	// Back
	// 	16, 17, 18,
	// 	16, 18, 19,

	// 	// Bottom
	// 	21, 20, 22,
	// 	22, 20, 23
	// ];

  const DODECAHEDRON_VERTEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ARRAY_BUFFER, DODECAHEDRON_VERTEX_BUFFER_OBJECT);
  GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(DODECAHEDRON_VERTEXES), GL.STATIC_DRAW);

  DODECAHEDRON_VERTEXES = [];

  const DODECAHEDRON_INDEX_BUFFER_OBJECT = GL.createBuffer();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, DODECAHEDRON_INDEX_BUFFER_OBJECT);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(DODECAHEDRON_INDEXES), GL.STATIC_DRAW);

  DODECAHEDRON_INDEXES = [];

  const POSITION_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertPosition`);
  const COLOR_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertColor`);
  const NORMAL_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertNormal`);
  // const TEXTURE_COORDINATE_ATTRIBUTE_LOCATION = GL.getAttribLocation(PROGRAM, `vertTextureCoordinate`);

  GL.vertexAttribPointer(
    POSITION_ATTRIBUTE_LOCATION,
    3, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    10 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );
  GL.vertexAttribPointer(
    COLOR_ATTRIBUTE_LOCATION,
    4, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    10 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );
  GL.vertexAttribPointer(
    NORMAL_ATTRIBUTE_LOCATION,
    3, // Number of element per attribute
    GL.FLOAT, // Type of elements, 
    GL.FALSE,
    10 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    7 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  );

  // GL.vertexAttribPointer(
  //   POSITION_ATTRIBUTE_LOCATION,
  //   3, // Number of element per attribute
  //   GL.FLOAT, // Type of elements, 
  //   GL.FALSE,
  //   5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  //   0 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  // );
  // GL.vertexAttribPointer(
  //   TEXTURE_COORDINATE_ATTRIBUTE_LOCATION,
  //   2, // Number of element per attribute
  //   GL.FLOAT, // Type of elements, 
  //   GL.FALSE,
  //   5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  //   3 * Float32Array.BYTES_PER_ELEMENT, // Offset from the beginning of a single vertex to this attribute
  // );

  GL.enableVertexAttribArray(POSITION_ATTRIBUTE_LOCATION);
  GL.enableVertexAttribArray(COLOR_ATTRIBUTE_LOCATION);
  // GL.enableVertexAttribArray(TEXTURE_COORDINATE_ATTRIBUTE_LOCATION);

  const BOX_TEXTURE = GL.createTexture();
  GL.bindTexture(GL.TEXTURE_2D, BOX_TEXTURE);
  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
  GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
  GL.texImage2D(
    GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, 
    GL.UNSIGNED_BYTE, 
    IMAGE
  );
  GL.bindTexture(GL.TEXTURE_2D, null);

  GL.useProgram(PROGRAM);

  const UNIFORM_MAT_LOCATION_WORLD = GL.getUniformLocation(PROGRAM, `mWorld`);
  const UNIFORM_MAT_LOCATION_VIEW = GL.getUniformLocation(PROGRAM, `mView`);
  const UNIFORM_MAT_LOCATION_PROJECTION = GL.getUniformLocation(PROGRAM, `mProjection`);
  const UNIFORM_MAT_LOCATION_NORMAL = GL.getUniformLocation(PROGRAM, `uNormalMatrix`);

  let matrixWorld = mat4.create();
  let matrixView = mat4.create();
  let matrixProjection = mat4.create();
  const normalMatrix = mat4.create();

  mat4.lookAt(matrixView, [0, 0, -7], [0, 0, 0], [0, 1, 0]);
  mat4.perspective(matrixProjection, Math.PI * 1 / 3, CANVAS.width / CANVAS.height, 0.1, 1000.0);

  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_WORLD, GL.FALSE, matrixWorld);
  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_VIEW, GL.FALSE, matrixView);
  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_PROJECTION, GL.FALSE, matrixProjection);
  GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_NORMAL, GL.FALSE, normalMatrix);

  const MATRIX_IDENTITY = mat4.create();

  const MATRIX_ROTATION_X = new Float32Array(16);
  const MATRIX_ROTATION_Y = new Float32Array(16);
  const MATRIX_ROTATION_Z = new Float32Array(16);

  let angle = 0;

  const loop = () => {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI * 1;

    mat4.rotate(MATRIX_ROTATION_X, MATRIX_IDENTITY, angle / 4, [1, 0, 0]);
    mat4.rotate(MATRIX_ROTATION_Y, MATRIX_IDENTITY, angle / 1, [0, 1, 0]);
    // rotate(MATRIX_ROTATION_Z, MATRIX_IDENTITY, angle / 2, [0, 0, 1]);
    
    mat4.multiply(matrixWorld, MATRIX_ROTATION_Y, MATRIX_ROTATION_X);
    // multiply(matrixWorld, matrixWorld, MATRIX_ROTATION_Z);

    mat4.invert(normalMatrix, matrixWorld);
    mat4.transpose(normalMatrix, normalMatrix);
    
    GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_WORLD, GL.FALSE, matrixWorld);
    GL.uniformMatrix4fv(UNIFORM_MAT_LOCATION_NORMAL, GL.FALSE, normalMatrix);

    resetCanvasDimension();

    GL.clearColor(0.01, 0.01, 0.01, 1.);
    GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);

    GL.bindTexture(GL.TEXTURE_2D, BOX_TEXTURE);
    GL.activeTexture(GL.TEXTURE0);

    GL.drawArrays(GL.TRIANGLES, 0, 3);
    GL.drawElements(GL.TRIANGLES, DODECAHEDRON_INDEXES_LENGTH, GL.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop); 
  }

  loop();
}

appendMemoryUsageCounter();