#version 300 es

precision lowp float;

in vec3 vertPosition;
in vec4 vertColor;
in vec3 vertNormal;

uniform mat4 uNormalMatrix;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProjection;

out vec4 fragColor;
out vec3 vVec3lighting;

void main() {
  gl_Position = mProjection * mView * mWorld * vec4(vertPosition, 1.);
  fragColor = vertColor;
  
  // Apply lighting effect

  vec3 ambientLight = vec3(.5, .5, .5);
  vec3 directionalLightColor = vec3(.99, .99, .99);
  vec3 directionalVector = normalize(vec3(.85, .8, .75));

  vec4 transformedNormal = uNormalMatrix * vec4(vertNormal, 1.0);

  float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vVec3lighting = ambientLight + (directionalLightColor * directional);
}