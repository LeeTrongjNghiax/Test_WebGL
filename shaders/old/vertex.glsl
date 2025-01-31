precision highp float;

attribute vec3 iVertPosition;
attribute vec4 iVertColor;
attribute vec3 iVertNormal;

uniform mat4 uNormalMatrix;
uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;

uniform vec3 uAmbientLightColor;
uniform vec3 uDirectionalLightColor;
uniform vec3 uDirectionalLightVector;

varying vec4 oFragColor;
varying vec3 oLighting;

void main() {
  gl_Position = uProjection * uView * uWorld * vec4(iVertPosition, 1.);
  oFragColor = iVertColor;
  
  // Apply lighting effect
  vec4 transformedNormal = uNormalMatrix * vec4(iVertNormal, 1.0);

  float directional = max(dot(transformedNormal.xyz, uDirectionalLightVector), 0.0);

  oLighting = uAmbientLightColor + (uDirectionalLightColor * directional);
}