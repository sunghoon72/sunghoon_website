

import * as T from "../Three/build/three.module.js";
import { MeshStandardMaterial } from "../Three/build/three.module.js";
import { OrbitControls } from "../Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer();
renderer.setSize(500, 500);
//renderer.setSize(window.innerWidth, windoe.innerHeight);
document.getElementById("div1").appendChild(renderer.domElement);

// student does the rest.
let scene = new T.Scene();
let camera = new T.PerspectiveCamera();
camera.position.set(10,10,10);
camera.lookAt(0, 3, 0);

let controls = new OrbitControls(camera, renderer.domElement);

let groundBox = new T.BoxGeometry(10, 0.1, 10);
let groundMesh = new T.Mesh(
groundBox,
new T.MeshLambertMaterial({ color: 0x888888 })
);

groundMesh.position.y = -0.05;
scene.add(groundMesh);

scene.add(new T.AmbientLight("white", 0.2));
let point = new T.PointLight("white", 1, 0, 0);
point.position.set(20, 10, 15);
scene.add(point);

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
console.log(Math.random());

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
scene.add(group);

  
let lastTimestamp;

let fall =0;
function animate(timestamp) {

    let t_theta = 0.5 * ((0.001 * timestamp) % 2.0);
    let t_theta1 = 0.5 * ((0.001 * timestamp));
    let theta = Math.PI * 2 * t_theta;
  

    let timeDelta = 0.1 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;

    group.rotation.y = 1.8*t_theta1;
fall -= 0.01;
snowgroup.position.set(0,fall,0);
scene.add(snowgroup);

if(fall <-40){
    fall = 0;
    scene.add(snowgroup);
}

renderer.render(scene, camera);
    window.requestAnimationFrame(animate);

}
window.requestAnimationFrame(animate);


export function snowman(){
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

let group = new T.Group();
group = new T.Group();
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
scene.add(group);

return group;
}

