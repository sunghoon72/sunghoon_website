/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";
import { shaderMaterial } from "../libs/Framework/shaderHelper.js";
import * as SimpleObjects from "../libs/Framework/SimpleObjects.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
let geometry;
let ctr = 0;
/**
 * @typedef myobjectProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class building extends GrObject{
/**
   * Simple looking helicopter - with a complex behavior
   *
   * @param {Object} params
   */
    constructor(params = {}){
      if (!geometry) {
        
        let w = 2;
        let h = 2;
        let d = 3;
        let r = 1;

       
      geometry = new T.Geometry();
      //
      geometry.vertices.push(new T.Vector3(-1, 0, 0)); //0  
      geometry.vertices.push(new T.Vector3(3, 0, 0)); //1
      geometry.vertices.push(new T.Vector3(-1, 1, 0)); //2
      geometry.vertices.push(new T.Vector3(3, 1, 0)); //3
      geometry.vertices.push(new T.Vector3(-1, 1, -2)); //4
      geometry.vertices.push(new T.Vector3(3, 1, -2)); //5
      geometry.vertices.push(new T.Vector3(-1, 0, -2)); //6
      geometry.vertices.push(new T.Vector3(3, 0, -2)); //7
      geometry.vertices.push(new T.Vector3(1, 2, -1)); //7
      //
      geometry.faceVertexUvs = [[]];
      let f1 = new T.Face3(0, 1, 2);
      geometry.faces.push(f1);
      geometry.faceVertexUvs[0].push([
        new T.Vector2(0, 0),
        new T.Vector2(1, 0),
        new T.Vector2(0, 1)
      ]);
      let f2 = new T.Face3(1, 3, 2);
      geometry.faces.push(f2);
      geometry.faceVertexUvs[0].push([
        new T.Vector2(1, 0),
        new T.Vector2(1, 1),
        new T.Vector2(0, 1)
      ]);

      let f3 = new T.Face3(2, 3, 4);
      geometry.faces.push(f3);

      let f4 = new T.Face3(3, 5, 4);
      geometry.faces.push(f4);
  
      let f5 = new T.Face3(6, 0, 4);
      geometry.faces.push(f5);
     

      let f6 = new T.Face3(0, 2, 4);
      geometry.faces.push(f6);
    

      let f7 = new T.Face3(1, 7, 3);
      geometry.faces.push(f7);
     

      let f8 = new T.Face3(7, 5, 3);
      geometry.faces.push(f8);
     

      let f9 = new T.Face3(6, 7, 4);
      geometry.faces.push(f9);
    

      let f10 = new T.Face3(7, 5, 4);
      geometry.faces.push(f10);
     

      let f11 = new T.Face3(0, 1, 6);
      geometry.faces.push(f11);
     
      let f12 = new T.Face3(1, 7, 6);
      geometry.faces.push(f12);
     
   

      geometry.computeFaceNormals();
      geometry.uvsNeedUpdate = true;
      //
    }
 
      let tl = new T.TextureLoader().load("./images/wall4.png");
      let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, side: T.DoubleSide });
      let mesh = new T.Mesh(geometry, material);
    mesh.scale.set(3,3,3);
    
    super(`building-${ctr++}`, mesh); 

    }

} 
let roofctr = 0;
export class roof extends GrObject{
  constructor(){
    let geometry = new T.Geometry();
    geometry.vertices.push(new T.Vector3(-1, 0, 0)); //0  
    geometry.vertices.push(new T.Vector3(3, 0, 0)); //1
    geometry.vertices.push(new T.Vector3(-1, 1, 0)); //2
    geometry.vertices.push(new T.Vector3(3, 1, 0)); //3
    geometry.vertices.push(new T.Vector3(-1, 1, -2)); //4
    geometry.vertices.push(new T.Vector3(3, 1, -2)); //5
    geometry.vertices.push(new T.Vector3(-1, 0, -2)); //6
    geometry.vertices.push(new T.Vector3(3, 0, -2)); //7
    geometry.vertices.push(new T.Vector3(1, 2, -1)); //8

    let f13 = new T.Face3(2, 3, 8);
    geometry.faces.push(f13);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(1/2, 1/2)
    ]);

    let f14 = new T.Face3(3, 5, 8);
    geometry.faces.push(f14);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1/2, 0),
      new T.Vector2(1/4, 1/2)
    ]);

    let f15 = new T.Face3(5, 4, 8);
    geometry.faces.push(f15);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(1/2, 1/2)
    ]);

    let f16 = new T.Face3(4, 2, 8);
    geometry.faces.push(f16);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1/2, 0),
      new T.Vector2(1/4, 1/2)
    ]);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //
    
    let tl = new T.TextureLoader().load("./images/wall2.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, side: T.DoubleSide });
    let mesh = new T.Mesh(geometry, material);

    let roofgroup = new T.Group();
    roofgroup.add(mesh);
    roofgroup.scale.set(3,3,3);
    super(`roof-${roofctr++}`, roofgroup);     

  }
}

export class secondbuilding extends GrObject{
  constructor(){
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 0, 0)); //0  
    geometry.vertices.push(new T.Vector3(0, 0, 0)); //1
    geometry.vertices.push(new T.Vector3(-1, 1, 0)); //2
    geometry.vertices.push(new T.Vector3(0, 1, 0)); //3
    geometry.vertices.push(new T.Vector3(-1, 1, -1)); //4
    geometry.vertices.push(new T.Vector3(0, 1, -1)); //5
    geometry.vertices.push(new T.Vector3(-1, 0, -1)); //6
    geometry.vertices.push(new T.Vector3(0, 0, -1)); //7
    geometry.vertices.push(new T.Vector3(-3,0,-1)); //8
    geometry.vertices.push(new T.Vector3(2,0,-1)); //9
    geometry.vertices.push(new T.Vector3(-3,1,-1)); //10
    geometry.vertices.push(new T.Vector3(2,1,-1)); //11
    geometry.vertices.push(new T.Vector3(-3,1,-3)); //12
    geometry.vertices.push(new T.Vector3(2,1,-3)); //13
    geometry.vertices.push(new T.Vector3(-3,0,-3)); //14
    geometry.vertices.push(new T.Vector3(2,0,-3)); //15
   

    geometry.faceVertexUvs = [[]];

    let f1 = new T.Face3(0, 1, 2);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(2/5, 0),
      new T.Vector2(3/5, 0),
      new T.Vector2(2/5, 1)
    ]);

    let f2 = new T.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(3/5, 0),
      new T.Vector2(3/5, 1),
      new T.Vector2(2/5, 1)
    ]);

    let f3 = new T.Face3(2,3,4);
    geometry.faces.push(f3);
    geometry.faceVertexUvs[0].push([]);
    
    let f4 = new T.Face3(3,5,4);
    geometry.faces.push(f4);
    geometry.faceVertexUvs[0].push([]);
    let f5 = new T.Face3(1,7,3);
    geometry.faces.push(f5);
    geometry.faceVertexUvs[0].push([]);
    let f6 = new T.Face3(7,5,3);
    geometry.faces.push(f6);
    geometry.faceVertexUvs[0].push([]);
    let f7 = new T.Face3(0,6,2);
    geometry.faces.push(f7);
    geometry.faceVertexUvs[0].push([]);
    let f8 = new T.Face3(6,4,2);
    geometry.faces.push(f8);
    geometry.faceVertexUvs[0].push([]);
   

    let f9 = new T.Face3(8,9,10);
    geometry.faces.push(f9);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 1/3),
      new T.Vector2(1, 1/3),
      new T.Vector2(0, 1)
    ]);

    let f10 = new T.Face3(9,11,10);
    geometry.faces.push(f10);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 1/3),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
    ]);

    let f11 = new T.Face3(10,11,12);
    geometry.faces.push(f11);
    let f12 = new T.Face3(11,13,12);
    geometry.faces.push(f12);
    let f13 = new T.Face3(9,15,11);
    geometry.faces.push(f13);
    let f14 = new T.Face3(15,13,11);
    geometry.faces.push(f14);
    let f15 = new T.Face3(8,14,10);
    geometry.faces.push(f15);
    let f16 = new T.Face3(14,12,10);
    geometry.faces.push(f16);
    let f17 = new T.Face3(14,15,12);
    geometry.faces.push(f17);
    let f18 = new T.Face3(15,13,12);
    geometry.faces.push(f18);
    



    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    
    
    let tl = new T.TextureLoader().load("./images/house.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, side: T.DoubleSide });
    let mesh = new T.Mesh(geometry, material);

    //roof

    let rg = new T.Geometry();
    rg.vertices.push(new T.Vector3(-1, 1, 0)); //0  
    rg.vertices.push(new T.Vector3(0, 1, 0)); //1
    rg.vertices.push(new T.Vector3(-1/2, 3/2, 0)); //2
    rg.vertices.push(new T.Vector3(-1, 1, -1)); //3
    rg.vertices.push(new T.Vector3( 0, 1, -1)); //4
    rg.vertices.push(new T.Vector3(-1/2, 3/2, -1)); //5
    rg.vertices.push(new T.Vector3(-3, 1, -1)); //6
    rg.vertices.push(new T.Vector3(2, 1, -1)); //7
    rg.vertices.push(new T.Vector3(-3, 3/2, -2)); //8
    rg.vertices.push(new T.Vector3(2, 3/2, -2)); //9
    rg.vertices.push(new T.Vector3(-3, 1, -3)); //10
    rg.vertices.push(new T.Vector3(2, 1, -3)); //11


    rg.faceVertexUvs = [[]];

    let a1 = new T.Face3(0, 1, 2);
    rg.faces.push(a1);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
   
    let a2 = new T.Face3(1,4,2);
    rg.faces.push(a2);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);

    let a3 = new T.Face3(4,5,2);
    rg.faces.push(a3);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a4 = new T.Face3(0,3,2);
    rg.faces.push(a4);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a5 = new T.Face3(3,5,2);
    rg.faces.push(a5);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a6 = new T.Face3(6,7,8);
    rg.faces.push(a6);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1/4)
    ]);
    let a7 = new T.Face3(7,9,8);
    rg.faces.push(a7);
    rg.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1/4),
      new T.Vector2(0, 1/4)
    ]);
    let a8 = new T.Face3(7,11,9);
    rg.faces.push(a8);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a9 = new T.Face3(6,10,8);
    rg.faces.push(a9);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a10 = new T.Face3(10,11,8);
    rg.faces.push(a10);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1/4)
    ]);
    let a11 = new T.Face3(11,9,8);
    rg.faces.push(a11);
    rg.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1/4),
      new T.Vector2(0, 1/4)
    ]);
    
   


    rg.computeFaceNormals();
    rg.uvsNeedUpdate = true;
    
    
    let t2 = new T.TextureLoader().load("./images/wall2.png");
    let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75, side: T.DoubleSide });
    let mesh2 = new T.Mesh( rg, material2);

    let building = new T.Group();
    building.add(mesh);
    building.add(mesh2);
    building.scale.set(2,2,2);
    super("secondbuilding", building);     
  }
}

export class fancybuilding extends GrObject{
  constructor(){
    let geometry = new T.Geometry();
    //
    geometry.vertices.push(new T.Vector3(-1, 0, 0)); //0  
    geometry.vertices.push(new T.Vector3(1, 0, 0)); //1
    geometry.vertices.push(new T.Vector3(-1, 1, 0)); //2
    geometry.vertices.push(new T.Vector3(1, 1, 0)); //3
    geometry.vertices.push(new T.Vector3(-1, 1, -2)); //4
    geometry.vertices.push(new T.Vector3(1, 1, -2)); //5
    geometry.vertices.push(new T.Vector3(-1, 0, -2)); //6
    geometry.vertices.push(new T.Vector3(1, 0, -2)); //7
    

    
    //
    geometry.faceVertexUvs = [[]];
    let f1 = new T.Face3(0, 1, 2);
    geometry.faces.push(f1);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let f2 = new T.Face3(1, 3, 2);
    geometry.faces.push(f2);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
    ]);

    let f3 = new T.Face3(2, 3, 4);
    geometry.faces.push(f3);
    let f4 = new T.Face3(3, 5, 4);
    geometry.faces.push(f4);
    let f5 = new T.Face3(6, 0, 4);
    geometry.faces.push(f5);
    let f6 = new T.Face3(0, 2, 4);
    geometry.faces.push(f6);
    let f7 = new T.Face3(1, 7, 3);
    geometry.faces.push(f7);
    let f8 = new T.Face3(7, 5, 3);
    geometry.faces.push(f8);
    let f9 = new T.Face3(6, 7, 4);
    geometry.faces.push(f9);
    let f10 = new T.Face3(7, 5, 4);
    geometry.faces.push(f10);
    let f11 = new T.Face3(0, 1, 6);
    geometry.faces.push(f11); 
    let f12 = new T.Face3(1, 7, 6);
    geometry.faces.push(f12);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    //2021-03-31-21-51-16.png
    let rg  = new T.Geometry();

    rg.vertices.push(new T.Vector3(-1, 1, 0)); //0
    rg.vertices.push(new T.Vector3(1, 1, 0)); //1
    rg.vertices.push(new T.Vector3(-1, 1, -2)); //2
    rg.vertices.push(new T.Vector3(1, 1, -2)); //3
    rg.vertices.push(new T.Vector3(-1-1/3, 1+1/3, 1/3)); //4
    rg.vertices.push(new T.Vector3(1+1/3, 1+1/3, 1/3)); //5
    rg.vertices.push(new T.Vector3(-1-1/3, 1+1/3, -2-1/3)); //6
    rg.vertices.push(new T.Vector3(1+1/3, 1+1/3, -2-1/3)); //7
    
    rg.faceVertexUvs = [[]];
    let a1 = new T.Face3(0, 1, 4);
    rg.faces.push(a1);
    rg.faceVertexUvs[0].push([]);
    
    let a2 = new T.Face3(1, 5, 4);
    rg.faces.push(a2);
    rg.faceVertexUvs[0].push([]);

    let a3 = new T.Face3(4, 5, 6);
    rg.faces.push(a3);
    rg.faceVertexUvs[0].push([
      new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(0, 1)
    ]);
    let a4 = new T.Face3(5, 7, 6);
    rg.faces.push(a4);
    rg.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
    ]);
    let a5 = new T.Face3(1,3,5);
    rg.faces.push(a5);
    let a6 = new T.Face3(3, 7, 5);
    rg.faces.push(a6);
    let a7 = new T.Face3(0, 2, 4);
    rg.faces.push(a7);
    let a8 = new T.Face3(2, 6, 4);
    rg.faces.push(a8);
    let a9 = new T.Face3(2, 3, 6);
    rg.faces.push(a9);
    let a10 = new T.Face3(3, 7, 6);
    rg.faces.push(a10);

    rg.computeFaceNormals();
    rg.uvsNeedUpdate = true;
    
    
    let tl = new T.TextureLoader().load("./images/house.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75, side: T.DoubleSide });
    let mesh = new T.Mesh(geometry, material);


    let t2 = new T.TextureLoader().load("./images/wall3.png");
    let material2 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75, side: T.DoubleSide });
    let mesh2 = new T.Mesh(rg, material2);

    let bgroup = new T.Group();
    bgroup.add(mesh);
    bgroup.add(mesh2);
    bgroup.scale.set(2,2,2);
    super("building", bgroup); 

  }
}
let treectr = 0;
export class tree extends GrObject{
  constructor(){



    let shaderMat = shaderMaterial("./shaders/water.vs", "./shaders/water.fs", {
      side: T.DoubleSide,
      uniforms: {
        
      },
    });

    let treeg = new T.ConeGeometry(1/2,3/2,30);
    let mat = new T.MeshStandardMaterial({color: "white"});
    let treetop = new T.Mesh(treeg, shaderMat);
    treetop.position.y = 1;

    let treeg2 = new T.ConeGeometry(1/2,3/2,30);
    let mat3 = new T.MeshStandardMaterial({color: "white"});
    let treetop2 = new T.Mesh(treeg2, shaderMat);
    treetop2.position.y = 1.5;

    let treeg4 = new T.ConeGeometry(1/2,3/2,30);
    let mat4 = new T.MeshStandardMaterial({color: "white"});
    let treetop4 = new T.Mesh(treeg4, shaderMat);
    treetop4.position.y = 2;

    let bg = new T.CylinderGeometry(1/5,1/5,1,32);
    //let t2 = new T.TextureLoader().load("../images/wall3.png");
    let mat2 = new T.MeshStandardMaterial({color: "brown"});



    
    let treebot = new T.Mesh(bg, mat2);

    
        let treegroup = new T.Group();
    treegroup.add(treetop);
    treegroup.add(treetop2);
    treegroup.add(treetop4);
    treegroup.add(treebot);


    treegroup.position.y = 1;
    
    treegroup.scale.set(4,4,4);
    super(`tree-${treectr++}`, treegroup);

  }
}

export class tree2 extends GrObject{
  constructor(){

    let image = new T.TextureLoader().load("./images/snow.png");


    let shaderMat = shaderMaterial("./shaders/tree.vs", "./shaders/tree.fs", {
      side: T.DoubleSide,
      uniforms: {
       
      time: {value: 1.0},
      contrast: {value: 0.1},
      distortion: {value: 0.1},
      speed: {value: 1.0},
      brightness: {value: 0.5},
      Color: {value: new T.Vector3(0.3,0.3,0.4)},
      noiseImage:{value: image},
      },
    });

    let treeg = new T.ConeGeometry(1/2,3/2,30);
    let mat = new T.MeshStandardMaterial({color: "white"});
    let treetop = new T.Mesh(treeg, shaderMat);
    treetop.position.y = 1;

    let treeg2 = new T.ConeGeometry(1/2,3/2,30);
    let mat3 = new T.MeshStandardMaterial({color: "white"});
    let treetop2 = new T.Mesh(treeg2, shaderMat);
    treetop2.position.y = 1.5;

    let treeg4 = new T.ConeGeometry(1/2,3/2,30);
    let mat4 = new T.MeshStandardMaterial({color: "white"});
    let treetop4 = new T.Mesh(treeg4, shaderMat);
    treetop4.position.y = 2;

    let bg = new T.CylinderGeometry(1/5,1/5,1,32);
    //let t2 = new T.TextureLoader().load("../images/wall3.png");
    let mat2 = new T.MeshStandardMaterial({color: "brown"});



    
    let treebot = new T.Mesh(bg, mat2);

    
        let treegroup = new T.Group();
    treegroup.add(treetop);
    treegroup.add(treetop2);
    treegroup.add(treetop4);
    treegroup.add(treebot);


    treegroup.position.y = 1;
    
    treegroup.scale.set(4,4,4);
    super(`tree-${treectr++}`, treegroup);

  }
}


