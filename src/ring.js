import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/Framework/GrWorld.js";
import { GrObject } from "../libs/Framework/GrObject.js";
import * as Loaders from "../libs/Framework/loaders.js";
import { GrCube } from "../libs/Framework/SimpleObjects.js";

let ringcrt=0;

export class bigring extends GrObject {
    constructor(params = {}) {
      let radius = params.radius || 9;
      let width = params.width || 1;
      let direction = params.direction;
      
      let ring = new T.TorusGeometry(radius, width, 10, 100);
      let material = new T.MeshStandardMaterial({
        side: T.DoubleSide,
        //color: "#909090",
        color: "red",
        roughness: 1.0,
      });
      let mesh = new T.Mesh(ring, material);
      mesh.rotateX(-Math.PI / 4);
      mesh.rotateY(-Math.PI / 4);
      let group = new T.Group();
      group.add(mesh);
      //group.translateX(params.x || 10);
      //group.translateY(params.bias || 10); // raise track above ground to avoid z-fight
      //group.translateZ(params.z || -10);
      super(`ring-${ringcrt++}`, group);
  
      this.x = params.x || 0;
      this.z = params.z || 0;
      this.y = params.bias || 0.1;
      this.r = radius;
      this.platform = group;
      this.time = 0;
      this.dir = direction;
      console.log("dir" + this.dir);
    }
    stepWorld(delta, timeOfDay) {
  
      if(this.dir == 1){
      this.platform.rotateY(0.0005 * delta);
      }
      else{
        this.platform.rotateZ(0.0005 * delta);
      }
      this.time += delta / 2000; // time in seconds
      // set the y position based on the time
      // where are we in the cycle?
      
     }

  
  }

