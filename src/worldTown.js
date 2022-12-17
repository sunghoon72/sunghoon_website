/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import { GrWorld } from "../libs/Framework/GrWorld.js";
import { WorldUI } from "../libs/Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";
import { shaderMaterial } from "../libs/Framework/shaderHelper.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/Framework/SimpleObjects.js";
import {main} from "../examples/main.js";
import {bus} from "./car.js";
import {pendulum} from "./parkobjects.js";
import {snow, snow2, snowing} from "./snowman.js";
import {model} from "./model.js";
import { bigring } from "./ring.js";
//import { copter } from "./copter.js";
import { floor } from "./floor.js";
import { Grtruck, Grbulldozer } from "./construction.js";
import { Helicopter, Helipad } from "./helicopter.js";

import { ShinySculpture } from "./shinySculpture.js";

import { building, roof, secondbuilding, fancybuilding, tree, tree2} from "./buildings.js";
/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: window.innerWidth,
    height: window.innerHeight,
    groundplanecolor: "white",
    
    groundplanesize: 30 // make the ground plane big enough for a world of stuff
});




// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment

//main(world);





function shift(grobj, x ,y, z, ) {
    grobj.objects[0].translateX(x);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateZ(z);
    
    return grobj;
  }

  let building1 = shift(new building(),-20,0, -20 );
  let roof1 = shift(new roof(),-20,0, -20 );
  let building2 = shift(new building(),-20, 3, -20 );
  let roof2 = shift(new roof(),-20,3, -20 );
  let building3 = shift(new building(),-20,6, -20 );
  let roof3 = shift(new roof(),-20,6, -20 );
  let building4 = shift(new building(),-20,9, -20 );
  //let roof4 = shift(new roof(),-20, 9, -20 );
  for(let i =0; i<4 ; i++){
    world.add(shift(new building(),-0 , i*3, -20 ));
  }
  //world.add(shift(new roof(),-0 , 9, -20 ));
  let bus1 = shift(new bus(), 10,0, -10);
  let pendulum1 = shift(new pendulum(), -10,0, 10);

  //snowman
  let snow1 = shift(new snow(), 15, 0,15);
  world.add(shift(new snow2(), -15, 0,-10));
  world.add(new snowing());


  //let copter1 = new copter();
  let ring1 = shift(new bigring({radius: 4, width:0.5, direction: 0}), 0, 10 ,0);
  let ring2 = shift(new bigring({radius: 3, width: 0.5, direction: 1}),0,10,0);
  let sphere = shift(new ShinySculpture(world, 2.5), 0,7,0);
  let floor1 = shift(new floor(), 15,0.1, 8 );
 
 
    


  world.add(building1);
  world.add(roof1);
  world.add(building2);
  world.add(roof2);
  world.add(building3);
  world.add(roof3);
  world.add(building4);
  //world.add(roof4);
  world.add(bus1);
  world.add(pendulum1);
  world.add(snow1);
  
  //astronaut
  world.add(shift(new model({tilt: Math.PI/2}), 0,0, 5));
  world.add(shift(new model({tilt : Math.PI }),0,0, 5));
  world.add(shift(new model({tilt: 2*Math.PI}), 0,0, 5));
  world.add(shift(new model({tilt: -Math.PI/2}), 0,0, 5));
  //ring
  world.add(ring1);
  world.add(ring2);

  //copter
 // world.add(copter1);
  world.add(sphere);
  world.add(new Helipad(-17, 12, -23));
  world.add(new Helipad( 3, 12, -23));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);
  
  //construction
  world.add(shift(new Grtruck(), 20,0.1, -20 ));
  world.add(shift(new Grbulldozer(), 40, 0, -15 ));
  
  for(let i=0; i<5 ; i++){
  world.add(shift(new tree(), 25,0, -20 + i*10 ));
  }

  for(let i=0; i<4 ; i++){
    world.add(shift(new tree(), -20 + i*10,0, 25 ));
    }
  

  
  let image = new T.TextureLoader().load("./images/snow.png");
  
  
  let shaderMat1 = shaderMaterial("./shaders/water.vs", "./shaders/water.fs", {
    side: T.DoubleSide,
    uniforms: {
        
        time: {value: 1.0},
        image: {value: image},
        speed: {value: 2.0},
        contrast: {value: 2.0},
        color: {value: new T.Vector3(0.5,0.5,0.3)},
    },
  });
    
  world.add(
    new SimpleObjects.GrSquareSign({ x: 0.1, y: Math.PI/2, size: 30, material: shaderMat1 })
  );


// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
//highlight("SimpleHouse-5");
//highlight("Helicopter-0");
highlight("building-0");
highlight("bus-0")
highlight("astronaut-0");
highlight("snowman-0");
highlight("snowman-1");
highlight("truck-0");
highlight("Bulldozer-0");
highlight("Helicopter-0");
highlight("pendulum-0");
highlight("ring-0");

///////////////////////////////////////////////////////////////
//world.ui = new WorldUI(world);
world.go();
