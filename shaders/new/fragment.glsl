#version 300 es

precision lowp float;

in vec4 fragColor;
in vec3 vVec3lighting;
out vec4 outFragColor;

void main() {
  outFragColor = vec4(fragColor.rgb * vVec3lighting, fragColor.a);
}