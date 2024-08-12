uniform vec3 uBaseColor;
uniform float uOpacityFactor;

varying float vStrength;
varying float vHeight;

void main() {
  // Calculate the distance from the center of the point
  float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
  
  // Create a soft edge effect
  float edgeStrength = smoothstep(0.5, 0.4, distanceFromCenter);
  
  // Apply a power function to control the falloff
  float strength = pow(edgeStrength, 1.0);

  // Use vHeight to modify the color (assuming vHeight is normalized between 0 and 1)
  vec3 color = mix(uBaseColor, vec3(1.0), vHeight * 1.0);
  
  // Calculate opacity based on vStrength and uOpacityFactor
  float opacity = strength * vStrength * uOpacityFactor;
  float realOpacity = smoothstep(0.2, 0.1, 1.0 - vStrength);

  // Output the final color
  gl_FragColor = vec4(color, realOpacity * opacity);
}