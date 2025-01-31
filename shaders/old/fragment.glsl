precision highp float;

varying vec4 oFragColor;
varying vec3 oLighting;

void main() {
  gl_FragColor = vec4(oFragColor.rgb * oLighting, oFragColor.a);
}