precision highp float;
precision highp int;

#define tau 6.2831853

uniform float time;
uniform float contrast;
uniform float distortion;
uniform float speed;
uniform vec3 color;
uniform float brightness;

uniform sampler2D noiseImage;

uniform vec2 resolution;
varying vec2 vUv;

mat2 makem2(in float theta) {
    float c = cos(theta);   
    float s = sin(theta);
    return mat2(c, -s, s, c);
}

float noise(in vec2 x) {
    return texture2D(noiseImage, x * .01).x;
}

float fbm(in vec2 p) {
    float z = 2.;
    float rz = 0.;
    vec2 bp = p;
    for (float i = 1.; i < 6.0; i++) {
        rz += abs((noise(p) - 0.5) * 2.0) / z;
        z = z * 2.;
        p = p * 2.;
    }
    return rz;
}

float dualfbm(in vec2 p) {
    vec2 p2 = p * distortion;
    vec2 basis = vec2(fbm(p2 - time * speed * 1.6), fbm(p2 + time * speed * 1.7));
    basis = (basis - .5) * .2;
    p += basis;
    return fbm(p * makem2(time *  speed * 0.2));
}

void main() {
    vec2 p = ( vUv.xy - 0.5 ) * resolution;
    float rz = dualfbm( p );
    
    vec3 col = ( color / rz ) * brightness;
    
    col = ( (col - 0.5 ) * max( contrast, 0.0 ) ) + 0.5;

    gl_FragColor = vec4( col, 1.0 );
}