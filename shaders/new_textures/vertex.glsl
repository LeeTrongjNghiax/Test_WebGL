#version 300 es

precision lowp float;

in vec3 vertPosition;
in vec2 vertTextureCoordinate;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

out vec2 fragTextureCoordinate;

void main() {
  fragTextureCoordinate = vertTextureCoordinate;
  gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.);
}