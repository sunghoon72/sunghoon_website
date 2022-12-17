/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

let image = new T.TextureLoader().load("./images/islands.png");

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 1) {
  obj.stepWorld = function (delta, timeOfDay) {
    obj.objects.forEach((obj) =>
      obj.rotateY(((speed * delta) / 1000) * Math.PI)
    );
  };
  return obj;
}

{
 

  let shaderMat = shaderMaterial("./shaders/11-08-02.vs", "./shaders/11-08-02.fs", {
    side: T.DoubleSide,
    uniforms: {
      colormap: { value: image },
    },
  });

  
}
