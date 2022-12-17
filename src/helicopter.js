/*jshint esversion: 6 */

// @ts-check

/**
 * Simple example for GraphicsTown - Helicopter
 *
 * Define Helipads (places for the helicopter to land)
 * After making the helicopter, use "getPads" to have it identify them
 * It is meant to have just 1 helicopter
 *
 * This is based on an older version - it tries to keep the quaint look
 *
 * The code is thrown together quickly - beware, it's ugly
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/Framework/GrWorld.js";
import { GrObject } from "../libs/Framework/GrObject.js";

// keep the helipad geometry global so we can re-use it
// variables are initialized to undefined by default
// (and its a warning to explicitly set them that way)
let helipadCount = 0;
let helipadMaterial;
let helipadGeometry;

export class Helipad extends GrObject {
  /**
   * Make a place for a helicopter to land
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  constructor(x, y, z) {
    if (!helipadGeometry) {
      // make the helipad geometry as a global - if it's not there
      const q = 0.25;
      const h = 0.5;
      // make the normals point upwards - no matter what orientation the triangle has
      const up = new T.Vector3(0, -1, 0);
      const padcoords = [
        -1,
        0,
        -1,
        -1,
        0,
        1,
        -h,
        0,
        1,
        -h,
        0,
        -1,
        1,
        0,
        -1,
        1,
        0,
        1,
        h,
        0,
        1,
        h,
        0,
        -1,
        -h,
        0,
        -q,
        -h,
        0,
        q,
        h,
        0,
        q,
        h,
        0,
        -q,
      ];
      const padidx = [2, 1, 0, 3, 2, 0, 4, 5, 6, 4, 6, 7, 10, 9, 8, 10, 8, 11];
      helipadGeometry = new T.Geometry();
      for (let i = 0; i < padcoords.length; i += 3) {
        helipadGeometry.vertices.push(
          new T.Vector3(padcoords[i], padcoords[i + 1], padcoords[i + 2])
        );
      }
      for (let i = 0; i < padidx.length; i += 3) {
        helipadGeometry.faces.push(
          new T.Face3(padidx[i], padidx[i + 1], padidx[i + 2], up)
        );
      }
    }
    if (!helipadMaterial) {
      helipadMaterial = new T.MeshLambertMaterial({
        color: "#FFFF00",
        side: T.DoubleSide,
      });
    }
    let mesh = new T.Mesh(helipadGeometry, helipadMaterial);

    super(`Helipad-${++helipadCount}`, mesh);
    mesh.position.x = x ? x : 0;
    mesh.position.y = (y ? y : 0) + 0.01;
    mesh.position.z = z ? z : 0;
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    
    this.mesh = mesh;
    this.objects.push(mesh);
  }
}

let helicopterCount = 0;

export class Helicopter extends GrObject {
  /**
   * Simple looking helicopter - with a complex behavior
   *
   * @param {Object} params
   */
  constructor(params = {}) {
    let group = new T.Group();
    super(`Helicopter-${helicopterCount}`, group);
    let material = new T.MeshStandardMaterial({
      color: "#00FFFF",
      side: T.DoubleSide,
    });

    this.helicopter = group;
    let helicopterBodyGeom = new T.BoxGeometry(0.5,0.5,2);
    
    let q = 0.25;
    let body = 1;
    let tail = params.tail || 2;
    let rotor = params.rotor || 2;
    
    
    this.body = new T.Mesh(helicopterBodyGeom, material);
    this.body.position.y = 1;
    this.body.castShadow = true;
    this.helicopter.add(this.body);


   

    this.rotorGeom = new T.BoxGeometry(0.3, 0.1, 2);
    
    this.rotor = new T.Mesh(this.rotorGeom, material);
    this.rotor.position.y = 1;
    this.rotor.position.x = -1;

    this.rotorGeom2 = new T.BoxGeometry(0.3, 0.1, 2);
    
    this.rotor2 = new T.Mesh(this.rotorGeom2, material);
    this.rotor2.position.y = 1;
    this.rotor2.position.x = 1;

    this.wingGeom = new T.BoxGeometry(0.3, 0.1, 2);
    this.wing = new T.Mesh(this.wingGeom, material);
    this.wing.position.y = 1;
    this.wing.rotation.y = Math.PI/2;


this.tailgeometry1 = new T.BoxGeometry(0.5, 0.1, 0.7);
this.tailmaterial1 = new T.MeshStandardMaterial({color: "#00FFFF"});
this.tail = new T.Mesh(this.tailgeometry1, this.tailmaterial1);

this.tail.position.y =1;
this.tail.position.z= -1.2;
this.tail.rotation.y = Math.PI/2;

this.tailgeometry2 = new T.BoxGeometry(0.5, 0.1, 0.3);
this.tailmaterial2 = new T.MeshStandardMaterial({color: "#00FFFF"});
this.tail2 = new T.Mesh(this.tailgeometry2, this.tailmaterial2);

this.tail2.position.y =1;
this.tail2.position.z= -1.2;
this.tail2.rotation.x = Math.PI/2;
this.tail2.rotation.z= Math.PI/2;
    

    this.helicopter.add(this.rotor);
    this.helicopter.add(this.rotor2);
    this.helicopter.add(this.wing);
    this.helicopter.add(this.tail);
    this.helicopter.add(this.tail2);
    this.helicopter.scale.set(2,2,2);
    // finite state machine
    this.state = 0;
    this.delay = 0;
    /** @type {Helipad[]} */
    this.pads = [];
    // pad we're currently at (or going to)
    /** @type {?Helipad} */
    this.current = undefined;

    //
    this.altitude = params.altitude || 17;

    // the helicopter is ridable - don't ride the rotor!
    this.rideable = this.body;
  }
  /**
   * This finds all of the landing places in the world, except that since
   * it doesn't know about the world, you need to pass it a list of objects
   * (usually world.objects)
   * @param {Array<GrObject>} grObjectList
   */
  getPads(grObjectList) {
    let that = this;
    grObjectList.forEach(function (obj) {
      if (obj instanceof Helipad) that.pads.push(obj);
    });
    console.log(`${this.pads.length} Helipads found, go to the first...`);
    this.current = this.pads[0];
    this.helicopter.position.x = this.current.mesh.position.x;
    this.helicopter.position.y = this.current.mesh.position.y;
    this.helicopter.position.z = this.current.mesh.position.z;
  }
  /** - I don't know why the type declarations aren't inherited
   * @param {number} delta
   * @param {number} timeOfDay
   *
   * The helicopter has a state machine which tells what it's motion is.
   * In each state, it moves to a goal, and when it gets there, picks the next state
   */
  stepWorld(delta, timeOfDay) {
    // all the speeds are arbitrary, so we tune things here
    let deltaSlowed = delta / 200;

    // spin the rotor around - even when the helicopter is landed
    this.rotor.rotateY(deltaSlowed * 4);
    this.rotor2.rotateY(deltaSlowed * 4);
    // state machine - depending on state, do the right thing
    if (this.pads.length) {
      switch (this.state) {
        case 0: // initialization
          this.state = 1;
          this.delay = 0;
          break;
        case 1: // ascend to altitude
          this.helicopter.position.y += deltaSlowed;
          if (this.helicopter.position.y >= this.altitude) {
            this.helicopter.position.y = this.altitude;
            this.state = 4;
            // pick a random helipad - must be different than where we are
            let targets = this.pads.filter((obj) => obj != this.current);
            let pick = Math.floor(Math.random() * targets.length);
            this.current = targets[pick];
            // compute the spin, before we start
            let dx = this.current.mesh.position.x - this.helicopter.position.x;
            let dz = this.current.mesh.position.z - this.helicopter.position.z;
            let ds = Math.sqrt(dx * dx + dz * dz);
            if (ds > 0) {
              // compute the goal angle
              this.goalangle = Math.atan2(dx, dz);
              // get the current angle
              let quat = new T.Quaternion();
              this.helicopter.getWorldQuaternion(quat);
              let eu = new T.Euler();
              eu.setFromQuaternion(quat);
              this.currentangle = eu.y;
              this.state = 4;
            } else {
              this.state = 5; // don't bother spinning
            }
          }
          break;
        case 2: // descend
          this.helicopter.position.y -= deltaSlowed;
          if (this.helicopter.position.y <= 11) {
            this.helicopter.position.y = 11;
            this.state = 3;
            this.delay = 1 + Math.random();
          }
          break;
        case 3: // wait before takeoff
          this.delay -= deltaSlowed;
          if (this.delay < 0) {
            this.state = 1; // take off again
          }
          break;
        case 4: // rotate to point towards destination
          let ad = this.goalangle - this.currentangle;
          if (ad > 0.1) {
            this.currentangle += 0.05;
          } else if (ad < -0.1) {
            this.currentangle -= 0.05;
          } else {
            this.state = 5;
            this.currentangle = this.goalangle;
          }
          this.helicopter.setRotationFromEuler(
            new T.Euler(0, this.currentangle, 0)
          );
          break;
        case 5: // fly to destination
          let dx = this.current.mesh.position.x - this.helicopter.position.x;
          let dz = this.current.mesh.position.z - this.helicopter.position.z;
          let dst = Math.sqrt(dx * dx + dz * dz);
          let ds = deltaSlowed * 1.5;
          if (dst > ds) {
            this.helicopter.position.x += (dx * ds) / dst;
            this.helicopter.position.z += (dz * ds) / dst;
          } else {
            this.helicopter.position.x = this.current.mesh.position.x;
            this.helicopter.position.z = this.current.mesh.position.z;
            this.state = 2;
          }
          break;
      }
    }
  }
}
