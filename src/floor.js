import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
let geometry;
export class floor extends GrObject{

    constructor(params = {}, paramInfo = []) {
        // make a square out of triangles
        let geom = new T.Geometry();
        
        geom.vertices.push(new T.Vector3(0, 0.1, 0));
        let uv0 = new T.Vector2(0, 0);
        geom.vertices.push(new T.Vector3(60, 0.1, 0));
        let uv1 = new T.Vector2(1, 0);
        geom.vertices.push(new T.Vector3(0, 0.1,60));
        let uv2 = new T.Vector2(0, 1);
        geom.vertices.push(new T.Vector3(60, 0.1, 60));
        let uv3 = new T.Vector2(1, 1);
        geom.faces.push(new T.Face3(0, 1, 2));
        geom.faces.push(new T.Face3(1, 3, 2));
        geom.computeFaceNormals();
        geom.faceVertexUvs = [
          [
            [uv0, uv1, uv2],
            [uv1, uv3, uv2]
          ]
        ];
        let material;
        if (params.material) {
          material = params.material;
        } else {
          let matprops = { side: T.DoubleSide };
          matprops.color = params.color ? params.color : 0xffffff;
          if (params.map) matprops.map = params.map;
          material = new T.MeshStandardMaterial(matprops);
          console.log(matprops);
        }
        let mesh = new T.Mesh(geom, material);
        super(`floor-0`, mesh, paramInfo);
        // put the object in its place
        mesh.position.x = params.x ? Number(params.x) : 0;
        mesh.position.y = params.y ? Number(params.y) : 0;
        mesh.position.z = params.z ? Number(params.z) : 0;
      }

} 
