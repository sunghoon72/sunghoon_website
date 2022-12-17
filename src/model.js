import * as T from "../libs/CS559-Three/build/three.module.js";
import { ObjectLoader } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";


import { GrObject } from "../libs/Framework/GrObject.js";
import { shaderMaterial } from "../libs/Framework/shaderHelper.js";

let crt = 0;
export class model extends GrObject{

    constructor(params = {}){
      let a =0;
      
        let w = 2;
      let h = 2;
      let d = 3;
      let r = 1;
      let tilt = params.tilt;

      let image = new T.TextureLoader().load("./images/earth.png");
let shaderMat = shaderMaterial("./shaders/11-09-02.vs", "./shaders/11-09-02.fs", {
    side: T.DoubleSide,
    uniforms: {
      tex: { value: image },
    },
  });

let loader = new OBJLoader();
let ast = new T.Group();

loader.load("./images/07-astronaut.obj", function(astronaut) {
        
        astronaut.scale.set(1,1,1);       
        
        astronaut.castShadow = true;
        ast.add(astronaut);
      
    });
    
   ast.position.set(0,5,0);
   ast.rotateY(tilt);
  
   super(`astronaut-${crt++}`,ast);
    }


}