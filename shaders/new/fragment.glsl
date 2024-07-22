#version 300 es

precision lowp float;

in vec3 fragColor;
out vec4 outFragColor;

void main() {
  outFragColor = vec4(fragColor, 1.);
}