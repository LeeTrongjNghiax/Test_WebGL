#version 300 es

precision lowp float;

in vec3 vertPosition;
in vec3 vertColor;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

out vec3 fragColor;

void main() {
  fragColor = vertColor;
  gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.);
}