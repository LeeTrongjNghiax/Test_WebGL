precision lowp float;

attribute vec3 vertPosition;
attribute vec3 vertColor;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

varying vec3 fragColor;

void main() {
  fragColor = vertColor;
  gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.);
}