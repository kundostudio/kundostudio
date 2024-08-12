// #pragma glslify: rotate = require(glsl-rotate/rotate)
// #pragma glslify: rotateX = require(glsl-rotate/rotateX)
// #pragma glslify: rotateY = require(glsl-rotate/rotateY)
// #pragma glslify: rotateZ = require(glsl-rotate/rotateZ)

// #pragma glslify: HALF_PI = require(glsl-constants/HALF_PI)
#pragma glslify: cnoise3 = require('glsl-noise/classic/3d')

uniform float uTime;
uniform float uNoiseScale;
uniform float uAmplitude;
uniform float uRadius;
uniform float uSize;
uniform float uSizeAttenuationFactor;
uniform float uVerticalSpeed;
uniform float uHorizontalSpeed;
uniform float uNoise2Scale;
uniform float uNoise2Amplitude;
uniform sampler2D uTexture;

varying float vStrength;
varying float vHeight;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

void main() {
  vec3 newPosition = position;
  float speed = uTime * uHorizontalSpeed;
  float verticalSpeed = uTime * uVerticalSpeed;
  
  float noise = cnoise3(vec3(position.x * uNoiseScale - speed, position.y * uNoiseScale, verticalSpeed));
  float noise2 = cnoise3(vec3(position.x * uNoise2Scale - speed, position.y * uNoise2Scale, verticalSpeed));

  newPosition.z += uAmplitude * noise - uNoise2Amplitude * noise2;
  newPosition.z = min(0.0, newPosition.z);

  float displace = texture2D(uTexture, uv).r;
  float angle = displace * 2.0 * 3.14159265359; // Convertir displace a un ángulo entre 0 y 2π

  // Calcular un nuevo valor de ruido para el ángulo
  float randomNoise = cnoise3(vec3(position.xy * 10.0, uTime)) * 0.5 + 0.5; // Valor entre 0 y 1

  // Modificar el ángulo con el valor de randomNoise
  angle += randomNoise * 2.0 * 3.14159265359; // Añadir aleatoriedad al ángulo

  // Mover en círculo con componente aleatorio
  newPosition.x += cos(angle) * displace * 0.3;
  newPosition.y += sin(angle) * displace * 0.3;
  newPosition.z -= sin(angle) * displace * 0.3;

  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  float size = distanceFactor * uSizeAttenuationFactor + uSize;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = size;
  // Size attenuation;
  gl_PointSize *= (1.0 / - viewPosition.z) - (newPosition.z * 0.1);
  // Set point size to 0 if it's less than 0.1
  gl_PointSize = max(gl_PointSize, 0.1) * step(0.1, gl_PointSize);

  vStrength = gl_PointSize;
  vHeight = newPosition.z;
}
