#version 300 es

precision lowp float;

in vec2 fragTextureCoordinate;

uniform sampler2D sampler;

out vec4 outFragColor;

void main() {
  outFragColor = texture(sampler, fragTextureCoordinate);
}