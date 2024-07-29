precision lowp float;

varying vec3 vVec3fragColor;
varying vec3 vVec3Lighting;

void main() {
  gl_FragColor = vec4(fragColor.rgb * vVec3Lighting, 1.);
}