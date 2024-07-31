#version 300 es

precision highp float;

in vec4 oFragColor;
in vec3 oLighting;
out vec4 outFragColor;

void main() {
  outFragColor = vec4(oFragColor.rgb * oLighting, oFragColor.a);
}