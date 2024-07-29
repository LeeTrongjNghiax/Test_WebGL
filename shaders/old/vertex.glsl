precision lowp float;

attribute vec3 aVec3VertPosition;
attribute vec3 aVec3VertColor;
attribute vec3 aVec3VertNormal;

uniform mat4 uMat4NormalMatrix;
uniform mat4 uMat4World;
uniform mat4 uMat4View;
uniform mat4 uMat4Projection;

varying vec3 vVec3fragColor;
varying vec3 vVec3lighting;

void main() {
  gl_Position = uMat4Projection * uMat4View * uMat4World * vec4(aVec3VertPosition, 1.);

  vVec3fragColor = aVec3VertColor;

  // Apply lighting effect

  vec3 ambientLight = vec3(.3, .3, .3);
  vec3 directionalLightColor = vec3(.99, .99, .0);
  vec3 directionalVector = normalize(vec3(.85, .8, .75));

  vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vVec3lighting = ambientLight + (directionalLightColor * directional);
}