#version 300 es

precision lowp float;

in vec4 fragColor;
out vec4 outFragColor;

void main() {
  outFragColor = fragColor;
}