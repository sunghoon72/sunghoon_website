precision highp float;
precision highp int;

// Default THREE.js uniforms available to both fragment and vertex shader
//uniform mat4 modelMatrix;
//uniform mat4 modelViewMatrix;
//uniform mat4 projectionMatrix;
//uniform mat4 viewMatrix;
//uniform mat3 normalMatrix;

uniform float waveWidth;
uniform float waveHeight;
uniform float speed;
uniform float time;

// Default attributes provided by THREE.js. Attributes are only available in the
// vertex shader. You can pass them to the fragment shader using varyings
//attribute vec3 position;
//attribute vec3 normal;
//attribute vec2 uv;
attribute vec2 uv2;

// Examples of variables passed from vertex to fragment shader
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv2;
varying float vHeight;

void main() {

    vNormal = normal;
    vUv = uv;
    
	vec4 v = vec4( position, 1.0 );
	float t = time * speed;
	
	v.z += (
	    // Add some offset to the waves to make it slightly less regular
	    sin(waveWidth * position.x + t * 1.3) *
	    cos(waveWidth * position.y + t * 0.9) * waveHeight
    ) + (
        // Extra waves to add interest
	    cos(waveWidth * 2.0 * position.x + t * -.3) *
	    sin(waveWidth * 4.0 * position.y + t * 3.9) * ( waveHeight / 2.0 )
    );
    vHeight = v.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * v;
    
}