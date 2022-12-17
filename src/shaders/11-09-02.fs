/* Procedural shading example for Exercise 8-2 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
varying vec3 v_normal;
 uniform sampler2D tex;


uniform vec3 lightcolor;
const vec3 lightDirWorld = vec3(0,1,0);
uniform float time;

void main()
{
    float ambientIntensity = 0.1f;
   

   vec3 nhat = normalize(v_normal);
   vec3 lightDir = normalize(viewMatrix * vec4(lightDirWorld, 0)).xyz;
  float lighting = clamp(dot(nhat, lightDir),0.0,1.0);
   
   vec3 light = lightcolor*lighting;

    vec4 texture =  (lighting+ambientIntensity)*texture2D(tex, v_uv);

    gl_FragColor = texture;


}

