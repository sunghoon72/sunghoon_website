
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";






// this is the part the student should change
//** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/

export class copter extends GrObject{
    constructor(params = {}){


let tempGeom = new T.CylinderGeometry(0.1,0.5,1.5,32);
let tempMaterial = new T.MeshStandardMaterial({ color: "red"  });
let tempMesh = new T.Mesh(tempGeom, tempMaterial);

tempMesh.scale.set(0.5, 0.5, 0.5);
tempMesh.position.y = 2;
tempMesh.position.z = -0.35;
tempMesh.rotation.x = -Math.PI/2;

let tempGeom1 = new T.CylinderGeometry(0.1,0.5,1.5,32);
let tempMaterial1 = new T.MeshStandardMaterial({ color: "red"  });
let tempMesh1 = new T.Mesh(tempGeom1, tempMaterial1);

tempMesh1.scale.set(0.5, 0.5, 0.5);
tempMesh1.position.y = 2;
tempMesh1.position.z = 0.35;
tempMesh1.rotation.x = Math.PI/2;

let winggeometry = new T.BoxGeometry(0.3, 0.1, 3);
let wingmaterial = new T.MeshStandardMaterial({color: "red"});
let wing = new T.Mesh(winggeometry, wingmaterial);

wing.position.y =2.2;
wing.rotation.y = Math.PI/2;

let spingeometry = new T.BoxGeometry(0.2, 0.05, 1);
let spinmaterial = new T.MeshStandardMaterial({color: "blue"});
let spin = new T.Mesh(spingeometry, spinmaterial);

spin.position.y =2.3;
spin.position.x = 1;

let spingeometry1 = new T.BoxGeometry(0.2, 0.05, 1);
let spinmaterial1 = new T.MeshStandardMaterial({color: "blue"});
let spin1 = new T.Mesh(spingeometry1, spinmaterial1);

spin1.position.y =2.3;
spin1.position.x = -1;
//spin.rotation.y = Math.PI/2;
let frontspingeometry1 = new T.BoxGeometry(0.2, 0.03, 0.7);
let frontspinmaterial1 = new T.MeshStandardMaterial({color: "blue"});
let frontspin1 = new T.Mesh(frontspingeometry1, frontspinmaterial1);

frontspin1.position.y =2;
frontspin1.position.z= -0.5;
frontspin1.rotation.x = Math.PI/2;

let tailgeometry1 = new T.BoxGeometry(0.2, 0.03, 0.7);
let tailmaterial1 = new T.MeshStandardMaterial({color: "red"});
let tail = new T.Mesh(tailgeometry1, tailmaterial1);

tail.position.y =2;
tail.position.z= 0.7;
tail.rotation.y = Math.PI/2;

let tailgeometry2 = new T.BoxGeometry(0.2, 0.04, 0.3);
let tailmaterial2 = new T.MeshStandardMaterial({color: "red"});
let tail2 = new T.Mesh(tailgeometry2, tailmaterial2);

tail2.position.y =2.1;
tail2.position.z= 0.7;
tail2.rotation.x = Math.PI/2;
tail2.rotation.z= Math.PI/2;

let copter = new T.Group();
copter.add(tempMesh);
copter.add(tempMesh1);
copter.add(wing);
copter.add(spin);
copter.add(spin1);
copter.add(frontspin1);
copter.add(tail);
copter.add(tail2);
copter.rotation.y = Math.PI;
copter.scale.set(3,3,3);
let radius = params.radius || 9;

super(`quadcopter`, copter);
this.x = params.x || 0;
this.z = params.z || 0;
this.y = params.bias || 0.1;
this.r = radius;

this.copter = copter;
this.copter.position.y = 1;
this.platform = copter;
this.sp1 = spin1;
this.sp2 = spin;
this.time = 0;
this.rideable = this.copter;

} eval(u) {
    let p = u * 2 * Math.PI;
    return [
      this.x + this.r * Math.cos(p),
      this.y,
      this.z + this.r * Math.sin(p),
    ];
  }
  tangent(u) {
    let p = u * 2 * Math.PI;
    // unit tangent vector - not the real derivative
    return [Math.sin(p), 0, -Math.cos(p)];
  }

 
    stepWorld(delta, timeOfDay) {
        
        this.time += delta / 2000; 
        this.platform.rotateY(0.0005 * delta);
        
        this.sp1.rotateY(0.005 * delta);
        this.sp2.rotateY(0.005 * delta);
       this.platform.translateX(0.005 * delta)
        
       }

}


