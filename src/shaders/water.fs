precision highp float;
precision highp int;

//uniform mat3 normalMatrix;
uniform float time;
uniform sampler2D image;
uniform float speed;
uniform float contrast;
uniform vec3 color;

varying float vHeight;
varying vec2 vUv;
varying vec3 vNormal;

void main() {

    float t = time * speed * 0.01;
    vec3 color = texture2D(
        image, vUv + vec2( sin( t ), cos( t ) )
    ).rgb + vHeight * contrast * color;
    
    gl_FragColor = vec4( color, 1.0 );

}
