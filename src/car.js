/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

let busctr =0;

export class bus extends GrObject{
    constructor(){

        let carg = new T.Geometry();

        carg.vertices.push(new T.Vector3(0, 0, 0)); //0  
        carg.vertices.push(new T.Vector3(1, 0, 0)); //1  
        carg.vertices.push(new T.Vector3(0, 1, 0)); //2  
        carg.vertices.push(new T.Vector3(1, 1, 0)); //3  
        carg.vertices.push(new T.Vector3(0, 1, -4)); //4
        carg.vertices.push(new T.Vector3(1, 1, -4)); //5
        carg.vertices.push(new T.Vector3(0, 0, -4)); //6
        carg.vertices.push(new T.Vector3(1, 0, -4)); //7  
        carg.vertices.push(new T.Vector3(0, 0, 1)); //8  
        carg.vertices.push(new T.Vector3(1, 0, 1)); //9  
        carg.vertices.push(new T.Vector3(0, 1/3, 1)); //10  
        carg.vertices.push(new T.Vector3(1, 1/3, 1)); //11 
        carg.vertices.push(new T.Vector3(0, 1/2, 2/3)); //12
        carg.vertices.push(new T.Vector3(1, 1/2, 2/3)); //13
        carg.vertices.push(new T.Vector3(0, 1/2, 1/3)); //14
        carg.vertices.push(new T.Vector3(1, 1/2, 1/3)); //15


        //carg.faceVertexUvs = [[]];

        let f2 = new T.Face3(0, 1, 2);
        f2.vertexColors[0] = new T.Color("yellow"); // 1
        f2.vertexColors[1] = new T.Color("yellow"); // 3
       f2.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f2);
      
        
        let f3 = new T.Face3(1,3,2);
        f3.vertexColors[0] = new T.Color("yellow"); // 1
        f3.vertexColors[1] = new T.Color("yellow"); // 3
        f3.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f3);
        
      
        let f4 = new T.Face3(2,3,4);
        f4.vertexColors[0] = new T.Color("yellow"); // 1
        f4.vertexColors[1] = new T.Color("yellow"); // 3
        f4.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f4);
        
        let f5 = new T.Face3(3,5,4);
        f5.vertexColors[0] = new T.Color("yellow"); // 1
        f5.vertexColors[1] = new T.Color("yellow"); // 3
        f5.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f5);
       
        let f6 = new T.Face3(1,7,3);
        f6.vertexColors[0] = new T.Color("yellow"); // 1
        f6.vertexColors[1] = new T.Color("yellow"); // 3
        f6.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f6);
      
        let f7 = new T.Face3(7,5,3);
        f7.vertexColors[0] = new T.Color("yellow"); // 1
        f7.vertexColors[1] = new T.Color("yellow"); // 3
        f7.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f7);
       
        let f8 = new T.Face3(0,6,2);
        f8.vertexColors[0] = new T.Color("yellow"); // 1
        f8.vertexColors[1] = new T.Color("yellow"); // 3
        f8.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f8);
       
        let f9 = new T.Face3(6,4,2);
        f9.vertexColors[0] = new T.Color("yellow"); // 1
        f9.vertexColors[1] = new T.Color("yellow"); // 3
        f9.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f9);
       
        let f10 = new T.Face3(6,7,4);
        f10.vertexColors[0] = new T.Color("yellow"); // 1
        f10.vertexColors[1] = new T.Color("yellow"); // 3
        f10.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f10);
       
        let f11 = new T.Face3(7,5,4);
        f11.vertexColors[0] = new T.Color("yellow"); // 1
        f11.vertexColors[1] = new T.Color("yellow"); // 3
        f11.vertexColors[2] = new T.Color("yellow")
        carg.faces.push(f11);
      

        let f12 = new T.Face3(8,9,10);
        f12.vertexColors[0] = new T.Color("yellow"); // 1
         f12.vertexColors[1] = new T.Color("yellow"); // 3
        f12.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f12);
       
        let f13 = new T.Face3(9,11,10);
        f13.vertexColors[0] = new T.Color("yellow"); // 1
         f13.vertexColors[1] = new T.Color("yellow"); // 3
        f13.vertexColors[2] = new T.Color("yellow");
        
        carg.faces.push(f13);
        
        let f14 = new T.Face3(10,11,12);
        f14.vertexColors[0] = new T.Color("yellow"); // 1
        f14.vertexColors[1] = new T.Color("yellow"); // 3
        f14.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f14);

        let f15 = new T.Face3(11,13,12);
        f15.vertexColors[0] = new T.Color("yellow"); // 1
        f15.vertexColors[1] = new T.Color("yellow"); // 3
        f15.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f15);
        let f16 = new T.Face3(12,13,14);
        f16.vertexColors[0] = new T.Color("yellow"); // 1
        f16.vertexColors[1] = new T.Color("yellow"); // 3
        f16.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f16);
        let f17 = new T.Face3(13,15,14);
        f17.vertexColors[0] = new T.Color("yellow"); // 1
        f17.vertexColors[1] = new T.Color("yellow"); // 3
        f17.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f17);
        let f18 = new T.Face3(14,15,2);
        f18.vertexColors[0] = new T.Color("black"); // 1
        f18.vertexColors[1] = new T.Color("black"); // 3
        f18.vertexColors[2] = new T.Color("black");
        carg.faces.push(f18);
        let f19 = new T.Face3(15,3,2);
        f19.vertexColors[0] = new T.Color("black"); // 1
        f19.vertexColors[1] = new T.Color("black"); // 3
        f19.vertexColors[2] = new T.Color("black");
        carg.faces.push(f19);

        let f20 = new T.Face3(9,13,11);
        f20.vertexColors[0] = new T.Color("orange"); // 1
        f20.vertexColors[1] = new T.Color("orange"); // 3
        f20.vertexColors[2] = new T.Color("orange");
        carg.faces.push(f20);
        let f21 = new T.Face3(9,15,13);
        f21.vertexColors[0] = new T.Color("yellow"); // 1
        f21.vertexColors[1] = new T.Color("yellow"); // 3
        f21.vertexColors[2] = new T.Color("yellow");

        carg.faces.push(f21);
        let f22 = new T.Face3(9,1,15);
        f22.vertexColors[0] = new T.Color("yellow"); // 1
        f22.vertexColors[1] = new T.Color("yellow"); // 3
        f22.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f22);
        let f23 = new T.Face3(1,3,15);
        f23.vertexColors[0] = new T.Color("red"); // 1
        f23.vertexColors[1] = new T.Color("red"); // 3
        f23.vertexColors[2] = new T.Color("red");

        carg.faces.push(f23);

        let f24 = new T.Face3(8,10,12);
        f24.vertexColors[0] = new T.Color("orange"); // 1
        f24.vertexColors[1] = new T.Color("orange"); // 3
        f24.vertexColors[2] = new T.Color("orange");
        carg.faces.push(f24);

        let f25 = new T.Face3(8,12,14);
        f25.vertexColors[0] = new T.Color("yellow"); // 1
        f25.vertexColors[1] = new T.Color("yellow"); // 3
        f25.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f25);

        let f26 = new T.Face3(8,14,0);
        f26.vertexColors[0] = new T.Color("yellow"); // 1
        f26.vertexColors[1] = new T.Color("yellow"); // 3
        f26.vertexColors[2] = new T.Color("yellow");
        carg.faces.push(f26);

        let f27 = new T.Face3(0,14,2);
        f27.vertexColors[0] = new T.Color("red"); // 1
        f27.vertexColors[1] = new T.Color("red"); // 3
        f27.vertexColors[2] = new T.Color("red");
        carg.faces.push(f27);

        let f28 = new T.Face3(8,9,0);
        carg.faces.push(f28);
        let f29 = new T.Face3(9,1,0);
        carg.faces.push(f29);

        let f30 = new T.Face3(0,1,6);
        carg.faces.push(f30);
        let f31 = new T.Face3(1,7,6);
        carg.faces.push(f31);

        

        carg.computeFaceNormals();
        carg.uvsNeedUpdate = true;

        let tg = new T.CylinderGeometry(1/3,1/3,1/3,32);
        
       let mat = new T.MeshStandardMaterial({color: "black"});

       let tire = new T.Mesh(tg,mat);

       let tire2 = tire.clone();
       let tire3 = tire.clone();
       let tire4 = tire.clone();


       tire.translateY(1/3);
       tire.rotateZ(Math.PI/2);

       tire2.translateX(1);
       tire2.translateY(1/3);
       tire2.rotateZ(Math.PI/2);

       tire3.translateZ(-3);
       tire3.translateY(1/3);
       tire3.rotateZ(Math.PI/2);

       tire4.translateX(1);
       tire4.translateZ(-3);
       tire4.translateY(1/3);
       tire4.rotateZ(Math.PI/2);
       

       
        let material = new T.MeshStandardMaterial({  vertexColors: T.VertexColors, roughness: 0.75, side: T.DoubleSide });
        

        
        let mesh = new T.Mesh(carg, material);
        
        mesh.position.y = 1/6;

        let busgroup = new T.Group();
        busgroup.add(tire);
        busgroup.add(tire2);
        busgroup.add(tire3);
        busgroup.add(tire4);
        busgroup.add(mesh);
        
        busgroup.scale.set(2,2,2);

        super(`bus-${busctr++}`, busgroup );
    }


}