/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm rotate", 0, 50, 45],
      ["forearm rotate", 0, 90, 45],
      ["bucket rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
}


let forkliftObCtr = 0;

// A simple excavator
/**
 * @typedef forkliftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Grforklift extends GrObject {
  /**
   * @param {forkliftProperties} params
   */
  constructor(params = {}) {
    let forklift = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let exSettings2 = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 2
      
    };

   
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(1, 0);
    base_curve.lineTo(1, 1.7);
    
    base_curve.lineTo(0.3, 2);
    base_curve.lineTo( 0, 1.5);
    base_curve.lineTo( -1, 1.5);
    base_curve.lineTo( -1, 0);
    
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "blue",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    forklift.add(base);
    //base.translateZ(-0.2);

    let wheelgeo = new T.CylinderGeometry(0.3,0.3,0.3,32);
    let wheelmat = new T.MeshStandardMaterial({color : "white"});
    let wheel = new T.Mesh(wheelgeo, wheelmat);
    
    forklift.add(wheel);

    let clonewheel = wheel.clone();
    forklift.add(clonewheel);
    let clonewheel2 = wheel.clone();
    forklift.add(clonewheel2);
    let clonewheel3 = wheel.clone();
    forklift.add(clonewheel3);

    clonewheel.position.x = -0.5;
    clonewheel.position.z = -0.2;
    clonewheel.position.y = 0.3;
    clonewheel.rotation.x = Math.PI/2;

    clonewheel2.position.x = -0.5;
    clonewheel2.position.z = 0.6;
    clonewheel2.position.y = 0.3;
    clonewheel2.rotation.x = Math.PI/2;

    clonewheel3.position.x = 0.5;
    clonewheel3.position.z = 0.6;
    clonewheel3.position.y = 0.3;
    clonewheel3.rotation.x = Math.PI/2;


    wheel.position.x = 0.5;
    wheel.position.z = -0.2;
    wheel.position.y = 0.3;
    wheel.rotation.x = Math.PI/2;




    let liftcurve = new T.Shape();
    liftcurve.moveTo(-1, 1);
    liftcurve.lineTo(-1.2, 1);
    liftcurve.lineTo(-1.2, -1);
    liftcurve.lineTo(-1, -1);
   
    let lift_geom = new T.ExtrudeGeometry(liftcurve, exSettings);
    let lift_mat = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let lift = new T.Mesh(lift_geom, lift_mat);

    let liftgroup = new T.Group();
    liftgroup.add(lift);

    liftgroup.position.y = 1;
   forklift.add(liftgroup);
   

   let front = new T.Group();
  
  liftgroup .add(front);

   let liftfrontcurve = new T.Shape();
    liftfrontcurve.moveTo(-1.2, -0.8);
    liftfrontcurve.lineTo(-1.2, -0.9);
    liftfrontcurve.lineTo(-2, -0.9);
    liftfrontcurve.lineTo(-2, -0.8);
   
    let liftgeo = new T.ExtrudeGeometry(liftfrontcurve, exSettings2);
    let liftmat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let liftfront = new T.Mesh(liftgeo, liftmat);
    
    let clone = liftfront.clone();
    clone.position.z = -0.1;
    liftfront.position.z = 0.4;

   front.add(liftfront);
   front.add(clone);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Forklift-${forkliftObCtr++}`, forklift, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["lift", 0, 80, 0],
      ["lift angle", 0, 30, 0],
     
      
     // ["forearm rotate", 0, 90, 45],
     // ["bucket rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = forklift;
    this.front = front;
    this.liftgroup = liftgroup;
    //this.cab = cab_group;
    //this.arm = arm_group;
    //this.forearm = forearm_group;
    //this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
   forklift.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.front.position.y = degreesToRadians(paramValues[3]);
    this.liftgroup.rotation.z = degreesToRadians(-paramValues[4]);
    //this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    //this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
}


let bulldozerObCtr = 0;

// A simple excavator
/**
 * @typedef bulldozerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Grbulldozer extends GrObject {
  /**
   * @param {bulldozerProperties} params
   */
  constructor(params = {}) {
    let bulldozer = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let exSettings2 = {
      steps: 2,
      depth: 2.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 2
      
    };

   
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(1, 0);
    base_curve.lineTo(1, 1.7);
    
    base_curve.lineTo(0.3, 2);
    base_curve.lineTo( 0, 1.5);
    base_curve.lineTo( -1, 1.5);
    base_curve.lineTo( -1, 0);
    
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "red",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    bulldozer.add(base);
    //base.translateZ(-0.2);

    let wheelgeo = new T.CylinderGeometry(0.3,0.3,0.3,32);
    let wheelmat = new T.MeshStandardMaterial({color : "white"});
    let wheel = new T.Mesh(wheelgeo, wheelmat);
    
    bulldozer.add(wheel);

    let clonewheel = wheel.clone();
    bulldozer.add(clonewheel);
    let clonewheel2 = wheel.clone();
    bulldozer.add(clonewheel2);
    let clonewheel3 = wheel.clone();
    bulldozer.add(clonewheel3);

    clonewheel.position.x = -0.5;
    clonewheel.position.z = -0.2;
    clonewheel.position.y = 0.3;
    clonewheel.rotation.x = Math.PI/2;

    clonewheel2.position.x = -0.5;
    clonewheel2.position.z = 2.2;
    clonewheel2.position.y = 0.3;
    clonewheel2.rotation.x = Math.PI/2;

    clonewheel3.position.x = 0.5;
    clonewheel3.position.z = 2.2;
    clonewheel3.position.y = 0.3;
    clonewheel3.rotation.x = Math.PI/2;


    wheel.position.x = 0.5;
    wheel.position.z = -0.2;
    wheel.position.y = 0.3;
    wheel.rotation.x = Math.PI/2;




   
    

   let liftgroup = new T.Group();
  
  bulldozer.add(liftgroup);

   let liftfrontcurve = new T.Shape();
    liftfrontcurve.moveTo(1, 1);
    liftfrontcurve.lineTo(3, 1);
    liftfrontcurve.lineTo(3, 0.5);
    liftfrontcurve.lineTo(1, 0.5);
   
    let liftgeo = new T.ExtrudeGeometry(liftfrontcurve, exSettings2);
    let liftmat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let liftfront = new T.Mesh(liftgeo, liftmat);
    
    let clone = liftfront.clone();
    clone.position.z = 2.2;
    clone.position.x = -1.3;
    clone.position.y = -0.7;

    liftfront.position.z = -0.3;
    liftfront.position.x = -1.3;
    liftfront.position.y = -0.7;

   liftgroup.add(liftfront);
   //liftgroup.add(clone);


    let liftangle = new T.Group();

    liftgroup.add(liftangle);
   let liftcurve = new T.Shape();
   liftcurve.moveTo(2, 1);
   liftcurve.lineTo(2, 3);
   liftcurve.lineTo(3.5, 3.5);
   liftcurve.bezierCurveTo(3.5, 4, 1.5, 2, 3.5, 0.5);
   liftcurve.lineTo(2, 1);
  
   let lift_geom = new T.ExtrudeGeometry(liftcurve, exSettings);
   let lift_mat = new T.MeshStandardMaterial({
     color: "gray",
     metalness: 0.5,
     roughness: 0.7
   });
   let lift = new T.Mesh(lift_geom, lift_mat);
   
   lift.scale.set(0.8,0.8, 1);
   lift.translateY(-2);
   lift.translateX(0.5);
   lift.rotation.z = Math.PI/8;

   
  liftangle.add(lift);

  liftgroup.position.y = 1;

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Bulldozer-${bulldozerObCtr++}`, bulldozer, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["lift", 0, 80, 0],
      ["lift angle", -5, 5, 0],
     
      
     // ["forearm rotate", 0, 90, 45],
     // ["bucket rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = bulldozer;
    this.liftangle = liftangle;
    this.liftgroup = liftgroup;
    //this.cab = cab_group;
    //this.arm = arm_group;
    //this.forearm = forearm_group;
    //this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1.5;
    this.state = 0;
   bulldozer.scale.set(scale, scale, scale);
  
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  
  stepWorld(delta, timeOfDay) {
    let time = delta / 1000; 
    //this.whole_ob.position.z = this.time;
    //this.whole_ob.position.z = paramValues[1];
    //this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    
    switch(this.state){
      case 0:
        this.state = 1;
        break;
      case 1: 
  this.whole_ob.position.x += time;
   if(this.whole_ob.position.x>= 3){
    this.whole_ob.position.x = 3
    this.state=3;
    }
  break;
  case 2:
    this.whole_ob.position.x -= time;
    if (this.whole_ob.position.x <= -3) {
      this.whole_ob.position.x = -3;
      this.state = 1;
  }
  break;
  case 3:
    this.liftgroup.rotation.z += time/2;
if(this.liftgroup.rotation.z>= 1){
this.liftgroup.rotation.z = 1
this.state=4;
}
break;
case 4:
  this.liftgroup.rotation.z -= time/2;
if (this.liftgroup.rotation.z <= 0) {
  this.liftgroup.rotation.z = 0;
  this.state = 2;
}
break;
}
}


}


let truckctr = 0;

// A simple excavator
/**
 * @typedef truckProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class Grtruck extends GrObject {
  /**
   * @param {truckProperties} params
   */
  constructor(params = {}) {
    let truck = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let exSettings2 = {
      steps: 2,
      depth: 2.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 2
      
    };

   
    let frontgeo = new T.BoxGeometry(2,2,2);
    let frontmat = new T.MeshStandardMaterial({color : "gold"});
    let front = new T.Mesh(frontgeo, frontmat);
    
    truck.add(front);
    front.position.y = 1.3;

    let backgeo = new T.BoxGeometry(2,1,5);
    let backmat = new T.MeshStandardMaterial({color : "gold"});
    let back = new T.Mesh(backgeo, backmat);
    
    truck.add(back);
    back.position.y = 0.8;
    back.position.z = 2;

    let dumpgroup = new T.Group();
    truck.add(dumpgroup);
    let dumpgeo = new T.BoxGeometry(2,1,3);
    let dumpmat = new T.MeshStandardMaterial({color : "gray"});
    let dump = new T.Mesh(dumpgeo, dumpmat);
    
    dump.applyMatrix4(new T.Matrix4().makeTranslation(0, 0.5, -1.5));

    dumpgroup.position.z = 4.5;
    dumpgroup.position.y = 1.3;
    //dump.position.set(0,3,3);
    

    dumpgroup.add(dump);
    
    

    let wheelgeo = new T.CylinderGeometry(0.3,0.3,0.3,32);
    let wheelmat = new T.MeshStandardMaterial({color : "white"});
    let wheel = new T.Mesh(wheelgeo, wheelmat);
    
    truck.add(wheel);

    let clonewheel = wheel.clone();
    truck.add(clonewheel);
    let clonewheel2 = wheel.clone();
    truck.add(clonewheel2);
    let clonewheel3 = wheel.clone();
    truck.add(clonewheel3);

    clonewheel.position.x = -1;
    clonewheel.position.z = -0.2;
    clonewheel.position.y = 0.3;
    clonewheel.rotation.z = Math.PI/2;

    clonewheel2.position.x = -1;
    clonewheel2.position.z = 3.2;
    clonewheel2.position.y = 0.3;
    clonewheel2.rotation.z = Math.PI/2;

    clonewheel3.position.x = 1;
    clonewheel3.position.z = 3.2;
    clonewheel3.position.y = 0.3;
    clonewheel3.rotation.z = Math.PI/2;


    wheel.position.x = 1;
    wheel.position.z = -0.2;
    wheel.position.y = 0.3;
    wheel.rotation.z = Math.PI/2;

    truck.position.x= 20;
    truck.position.z= -20;

    
    super(`truck-${truckctr++}`, truck, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["Dump", 0, 80, 0],
      
     
      
     // ["forearm rotate", 0, 90, 45],
     // ["bucket rotate", -90, 45, 0]
    ]);

   this.state = 0;
   this.dstate = 0;
    this.whole_ob = truck;
    this.dumpgroup = dumpgroup;
    this.time = 0;
    this.rideable = this.whole_ob;
    //this.liftgroup = liftgroup;
    
    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1.5;
   truck.scale.set(scale, scale, scale);
  }

 
  stepWorld(delta, timeOfDay) {
    let time = delta / 500; 
    //this.whole_ob.position.z = this.time;
    //this.whole_ob.position.z = paramValues[1];
    //this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    
    switch(this.state){
      case 0:
        this.state = 1;
        break;
      case 1: 
  this.whole_ob.position.z += time;
   if(this.whole_ob.position.z>= -10){
    this.whole_ob.position.z = -10
    this.state=3;
    }
  break;
  case 2:
    this.whole_ob.position.z -= time;
    if (this.whole_ob.position.z <= -20) {
      this.whole_ob.position.z = -20;
      this.state = 1;
  }
  break;
  case 3:
    this.dumpgroup.rotation.x += time/2;
if(this.dumpgroup.rotation.x>= 2){
this.dumpgroup.rotation.x = 2
this.state=4;
}
break;
case 4:
  this.dumpgroup.rotation.x -= time/2;
if (this.dumpgroup.rotation.x <= 0) {
  this.dumpgroup.rotation.x = 0;
  this.state = 2;
}
break;
}



    //this.liftangle.rotation.z = degreesToRadians(paramValues[4]);
    
   
  }
}