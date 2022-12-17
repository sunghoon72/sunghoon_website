/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";



let myobjectObCtr = 0;
/**
 * @typedef myobjectProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class pendulum extends GrObject {

  /**
   * @param {myobjectProperties} params
   */
   constructor(params = {}) {
    let myobject = new T.Group();

    let base_geom = new T.CylinderGeometry(1, 1, 1, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    myobject.add(base);

    let platform_geom = new T.CylinderGeometry(0.5, 0.5, 10, 8, 4);
    let platform_mat = new T.MeshStandardMaterial({
      color: "blue",
      metalness: 0.3,
      roughness: 0.6
    });
    let platform_mat2 = new T.MeshStandardMaterial({
      color: "red",
      metalness: 0.3,
      roughness: 0.6
    });

    let tophatgeo = new T.SphereGeometry(1.5,32,32);
    let tophat = new T.Mesh(tophatgeo, platform_mat2);
    tophat.position.y = 10;


    let polegeo = new T.CylinderGeometry(0.2, 0.2, 9, 8, 4);
    let polemat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.3,
      roughness: 0.6
    });
    let pole = new T.Mesh(polegeo, polemat);
    pole.translateY(6);

    let colors = ["red", "blue", "yellow", "green", "pink", "black" ,
    "white", "orange" , "purple", "brown" ];
    let seatgeo = new T.BoxGeometry( 1.5 , 1.5 , 1.5);
    let seatmat = new T.MeshStandardMaterial({color: colors[1]});
    let seat = new T.Mesh(seatgeo, seatmat);
    
    seat.translateY(1);
    
    let arm = new T.Group();
    arm.add(pole);
    arm.add(seat);
    
    
   

    let clone = arm.clone();
    clone.translateX(-7);
    clone.translateY(3);
    clone.rotateZ(-Math.PI/4);
    
    let clone2 = arm.clone();
    clone2.translateZ(7);
    clone2.translateY(3);
    clone2.rotateX(-Math.PI/4);

    let clone3 = arm.clone();
    clone3.translateZ(-7);
    clone3.translateY(3);
    clone3.rotateX(Math.PI/4);

    
    arm.translateX(7);
    arm.translateY(3);
    arm.rotateZ(Math.PI/4);
   

    let arms = [];
    arms.push(arm);
    arms.push(clone);
    arms.push(clone2);
    arms.push(clone3);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform.position.y = 5;
    platform_group.add(platform);
    platform_group.add(tophat);
    platform_group.add(arm);
    platform_group.add(clone);
    platform_group.add(clone2);
    platform_group.add(clone3);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`pendulum-${myobjectObCtr++}`, myobject);
    this.whole_ob = myobject;
    this.platform = platform_group;
    this.arms = arms;
    this.time = 0;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    myobject.scale.set(scale, scale, scale);
   

  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
   stepWorld(delta, timeOfDay) {
  
    this.platform.rotateY(0.0005 * delta);
    
   
    
      
    this.time += delta / 2000; // time in seconds
    // set the y position based on the time
    // where are we in the cycle?
  
    
    
     for(let i =0; i < 4; i++){
       let t = (this.time+ 0.2*i) % 1;
    if (t < 0.1 || t > 0.9) this.arms[i].position.y = 2.3;
    else {
      this.arms[i].position.y = 2.3 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
    }
   }
  
    }

}
