/**
 * 07-08-01.js - a simple JavaScript file that gets loaded with
 * page 8 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { MeshStandardMaterial } from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { GrObject } from "../libs/Framework/GrObject.js";
import { shaderMaterial } from "../libs/Framework/shaderHelper.js";


let snowctr = 0;


export class snow extends GrObject{

 constructor(params = {}, paramInfo = []) {
        let w = 2;
        let h = 2;
        let d = 3;
        let r = 1;

let geometry = new T.SphereGeometry( 2, 7, 7 );
let material = new T.MeshStandardMaterial( {color: "white"} );
let sphere = new T.Mesh( geometry, material );
sphere.position.y = 1.5;

let sphere1 = new T.Mesh( geometry, material );
sphere1.scale.set(0.7,0.7,0.7);
sphere1.position.y = 3.5;


let sphere2 = new T.Mesh( geometry, material );
sphere2.scale.set(0.5,0.5,0.5);
sphere2.position.y = 5;

let geometry3 = new T.SphereGeometry( 0.1, 8, 8 );
let material3 = new T.MeshStandardMaterial( {color: "black"} );
let eye = new T.Mesh( geometry3, material3 );
eye.position.set(0.7, 5.5, 0.3);

let eye2 = new T.Mesh( geometry3, material3 );
eye2.position.set(0.7, 5.5, -0.3);

let mouth1 = new T.Mesh( geometry3, material3 );
mouth1.position.set(0.85, 5.1, 0.3);

let mouth2 = new T.Mesh( geometry3, material3 );
mouth2.position.set(0.9, 5.0, 0.2);

let mouth3 = new T.Mesh( geometry3, material3 );
mouth3.position.set(0.9, 4.92, 0.1);

let mouth4 = new T.Mesh( geometry3, material3 );
mouth4.position.set(1, 4.9, 0);

let mouth5 = new T.Mesh( geometry3, material3 );
mouth5.position.set(0.9, 4.92, -0.1);

let mouth6 = new T.Mesh( geometry3, material3 );
mouth6.position.set(0.9, 5., -0.2);

let mouth7 = new T.Mesh( geometry3, material3 );
mouth7.position.set(0.85, 5.1, -0.3);

let group1 = new T.Group();
group1.add(mouth1);
group1.add(mouth2);
group1.add(mouth3);
group1.add(mouth4);
group1.add(mouth5);
group1.add(mouth6);
group1.add(mouth7);


let geometry1 = new T.ConeGeometry( 0.3, 2, 10 );
let material1 = new T.MeshStandardMaterial( {color: "orange"} );
let cone = new T.Mesh( geometry1, material1 );
cone.rotateZ(-Math.PI/2);
cone.position.set(1,5.3,0);
//scene.add(cone);

let hatgeometry = new T.CylinderGeometry( 1, 1, 0.1, 8 );
let hat = new T.Mesh(
hatgeometry, new T.MeshStandardMaterial({ color: "red" })
);
hat.rotation.x = Math.PI;
hat.position.set(0,5.9,0);

let tophatgeometry = new T.CylinderGeometry( 0.5, 0.5, 2, 8 );
let tophat = new T.Mesh(
tophatgeometry, new T.MeshStandardMaterial({ color: "red" })
);
tophat.rotation.x = Math.PI;
tophat.position.set(0,5.9,0);


let leftarmgeometry = new T.CylinderGeometry( 0.1, 0.1, 3, 8 );
let leftarm = new T.Mesh(
leftarmgeometry, new T.MeshStandardMaterial({ color: "brown" })
);
leftarm.position.set(0, 4 , 1);
leftarm.rotation.x = Math.PI/4;
//scene.add(leftarm);

let rightarm = new T.Mesh(leftarmgeometry, new T.MeshStandardMaterial({ color: "brown" }));
rightarm.position.set(0, 4 , -1);
rightarm.rotation.x = -Math.PI/3;
//cene.add(rightarm);


let geometry4 = new T.SphereGeometry(0.1, 8, 8);
let materials = new T.MeshStandardMaterial({color : "white"});

let snowgroup = new T.Group();
let snows = [];
let y = [];
for (let i = 0; i < 100; i++) {
    snows[i] = new T.Mesh(geometry4, materials);
    y[i]= Math.random()*50;
    snows[i].position.set(Math.random()*8-4, y[i], Math.random()*5);
    snowgroup.add(snows[i]);
}

for (let i = 0; i < 100; i++) {
    snows[i] = new T.Mesh(geometry4, materials);
    snows[i].position.set(Math.random()*8-4, Math.random()*50, -Math.random()*5);
    snowgroup.add(snows[i]);
}


let group = new T.Group();
group.add(leftarm);
group.add(rightarm);
group.add(eye);
group.add(eye2);
group.add(group1);
group.add(sphere);
group.add(sphere1);
group.add(sphere2);
group.add(hat);
group.add(tophat);
group.add(cone);

group.scale.set(2,2,2);

super(`snowman-${snowctr++}`, group);

this.body = group;
}
stepWorld(delta, timeOfDay) {

let time = delta/1000;

this.body.rotation.y += time;

}


}

export class snow2 extends GrObject{

    constructor(params = {}, paramInfo = []) {
           let w = 2;
           let h = 2;
           let d = 3;
           let r = 1;


           let image = new T.TextureLoader().load("./images/snow.png");

           let shaderMat1 = shaderMaterial("./shaders/11-08-02.vs", "./shaders/11-08-02.fs", {
            side: T.DoubleSide,
            uniforms: {
                image: {value: image},
               
            },
          });

   let geometry = new T.SphereGeometry( 2, 7, 7 );
   let material = new T.MeshStandardMaterial( {color: "white"} );
   let sphere = new T.Mesh( geometry, shaderMat1 );
   sphere.position.y = 1.5;
   
   let sphere1 = new T.Mesh( geometry, shaderMat1 );
   sphere1.scale.set(0.7,0.7,0.7);
   sphere1.position.y = 3.5;
   
   
   let sphere2 = new T.Mesh( geometry, shaderMat1 );
   sphere2.scale.set(0.5,0.5,0.5);
   sphere2.position.y = 5;
   
   let geometry3 = new T.SphereGeometry( 0.1, 8, 8 );
   let material3 = new T.MeshStandardMaterial( {color: "black"} );
   let eye = new T.Mesh( geometry3, material3 );
   eye.position.set(0.7, 5.5, 0.3);
   
   let eye2 = new T.Mesh( geometry3, material3 );
   eye2.position.set(0.7, 5.5, -0.3);
   
   let mouth1 = new T.Mesh( geometry3, material3 );
   mouth1.position.set(0.85, 5.1, 0.3);
   
   let mouth2 = new T.Mesh( geometry3, material3 );
   mouth2.position.set(0.9, 5.0, 0.2);
   
   let mouth3 = new T.Mesh( geometry3, material3 );
   mouth3.position.set(0.9, 4.92, 0.1);
   
   let mouth4 = new T.Mesh( geometry3, material3 );
   mouth4.position.set(1, 4.9, 0);
   
   let mouth5 = new T.Mesh( geometry3, material3 );
   mouth5.position.set(0.9, 4.92, -0.1);
   
   let mouth6 = new T.Mesh( geometry3, material3 );
   mouth6.position.set(0.9, 5., -0.2);
   
   let mouth7 = new T.Mesh( geometry3, material3 );
   mouth7.position.set(0.85, 5.1, -0.3);
   
   let group1 = new T.Group();
   group1.add(mouth1);
   group1.add(mouth2);
   group1.add(mouth3);
   group1.add(mouth4);
   group1.add(mouth5);
   group1.add(mouth6);
   group1.add(mouth7);
   
   
   let geometry1 = new T.ConeGeometry( 0.3, 2, 10 );
   let material1 = new T.MeshStandardMaterial( {color: "orange"} );
   let cone = new T.Mesh( geometry1, material1 );
   cone.rotateZ(-Math.PI/2);
   cone.position.set(1,5.3,0);
   //scene.add(cone);
   
   let hatgeometry = new T.CylinderGeometry( 1, 1, 0.1, 8 );
   let hat = new T.Mesh(
   hatgeometry, new T.MeshStandardMaterial({ color: "red" })
   );
   hat.rotation.x = Math.PI;
   hat.position.set(0,5.9,0);
   
   let tophatgeometry = new T.CylinderGeometry( 0.5, 0.5, 2, 8 );
   let tophat = new T.Mesh(
   tophatgeometry, new T.MeshStandardMaterial({ color: "red" })
   );
   tophat.rotation.x = Math.PI;
   tophat.position.set(0,5.9,0);
   
   
   let leftarmgeometry = new T.CylinderGeometry( 0.1, 0.1, 3, 8 );
   let leftarm = new T.Mesh(
   leftarmgeometry, new T.MeshStandardMaterial({ color: "brown" })
   );
   leftarm.position.set(0, 4 , 1);
   leftarm.rotation.x = Math.PI/4;
   //scene.add(leftarm);
   
   let rightarm = new T.Mesh(leftarmgeometry, new T.MeshStandardMaterial({ color: "brown" }));
   rightarm.position.set(0, 4 , -1);
   rightarm.rotation.x = -Math.PI/3;
   //cene.add(rightarm);
   
   
   let geometry4 = new T.SphereGeometry(0.1, 8, 8);
   let materials = new T.MeshStandardMaterial({color : "white"});
   
   let snowgroup = new T.Group();
   let snows = [];
   let y = [];
   for (let i = 0; i < 100; i++) {
       snows[i] = new T.Mesh(geometry4, materials);
       y[i]= Math.random()*50;
       snows[i].position.set(Math.random()*8-4, y[i], Math.random()*5);
       snowgroup.add(snows[i]);
   }
   
   for (let i = 0; i < 100; i++) {
       snows[i] = new T.Mesh(geometry4, materials);
       snows[i].position.set(Math.random()*8-4, Math.random()*50, -Math.random()*5);
       snowgroup.add(snows[i]);
   }
   
   
   let group = new T.Group();
   group.add(leftarm);
   group.add(rightarm);
   group.add(eye);
   group.add(eye2);
   group.add(group1);
   group.add(sphere);
   group.add(sphere1);
   group.add(sphere2);
   group.add(hat);
   group.add(tophat);
   group.add(cone);
   
   group.scale.set(2,2,2);
   
   super(`snowman-${snowctr}`, group);
   
   this.body = group;
   }
   stepWorld(delta, timeOfDay) {
   
   let time = delta/2000;
   
   this.body.rotation.y += time;
   
   }
   
   
   }

   export class snowing extends GrObject{

    
        
        constructor(){
        let geometry4 = new T.SphereGeometry(0.2, 8, 8);
        let materials = new T.MeshStandardMaterial({color : "white"});
        
        let snowgroup = new T.Group();
        let snows = [];
        let y = [];
        for (let i = 0; i < 100; i++) {
            snows[i] = new T.Mesh(geometry4, materials);
            y[i]= Math.random()*50;
            snows[i].position.set(-Math.random()*30-4, y[i], Math.random()*30-4);
            snowgroup.add(snows[i]);
        }
        for (let i = 100; i < 200; i++) {
            snows[i] = new T.Mesh(geometry4, materials);
            snows[i].position.set(Math.random()*30-4, Math.random()*50, -Math.random()*30-4);
            snowgroup.add(snows[i]);
        }
        for (let i = 200; i < 300; i++) {
            snows[i] = new T.Mesh(geometry4, materials);
            snows[i].position.set(-Math.random()*30-4, Math.random()*50, -Math.random()*30-4);
            snowgroup.add(snows[i]);
        }
        for (let i = 300; i < 400; i++) {
            snows[i] = new T.Mesh(geometry4, materials);
            snows[i].position.set(Math.random()*30-4, Math.random()*50, Math.random()*30-4);
            snowgroup.add(snows[i]);
        }

        super(`snowing`, snowgroup);
        this.state = 0;
        this.snows = snows;
        this.snowstemp = snows;
        this.delay = 0;
        }
        stepWorld(delta, timeOfDay ){
            let time = delta/300;
            switch (this.state) {
                case 0: // initialization
                this.state = 1;
                this.delay = 0;
                break;
                case 1:
                    for(let i=0; i<400; i++){
                    this.snows[i].position.y -= time;
                    if(this.snows[i].position.y <= 0){
                        this.snows[i].position.y = 0;
                        
                        this.state =2;     
                    }
                    }
                   
                    break;
               

                case 2:
                    for(let i=0; i<400; i++){
                        if(this.snows[i].position.y ==0)
                        this.snows[i].position.y = Math.random()*50;
                    }
                   this.state = 1;
                   break;        
                }
                        
                    }


            }


        

   
   

