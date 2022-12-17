/*
 * Simple Shader for exercise 8-2
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 v_normal;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    v_uv = uv;
 v_normal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}

