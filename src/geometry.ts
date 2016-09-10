
import {parser, split_length} from "./utils.ts";

class Point {
    x: number
    y: number
    z: number
    
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    write() {
        let out = parser.fromFloat(this.x);
        out += parser.fromFloat(this.y);
        out += parser.fromFloat(this.z);
        return out;
    }
}

function cross_product(point1: Point, point2: Point) {
    let x = point1.y * point2.z - point1.z * point2.y;
    let y = point1.z * point2.x - point1.x * point2.z;
    let z = point1.x * point2.y - point1.y * point2.x;
    return new Point(x, y, z);
}

function calculate_normal(a: Point, b: Point, c: Point) {
    let v1: Point = new Point(b.x - a.x, b.y - a.y, b.z - a.z);
    let v2: Point = new Point(c.x - a.x, c.y - a.y, c.z - a.z);
    return cross_product(v1, v2);
}

export const binaryTriangleSize = 50;

export class Triangle {
    vertices: Point[]
    normal: Point
    
    constructor(arg: any) {
        if (arg instanceof Array) {
            this.vertices = arg;
            this.normal = calculate_normal(this.vertices[0], this.vertices[1], this.vertices[2]);
        }
        else if (typeof(arg) == "string") {
            let pieces = split_length(arg, 4);
            let coords = pieces.map(str => parser.toFloat(str));
            
            this.normal = new Point(coords[0], coords[1], coords[2]);
            this.vertices = [];
            for (let i = 3; i < pieces.length; i += 3) {
                this.vertices.push(new Point(coords[i], coords[i+1], coords[i+2]));
            }
        }
        else {
            throw 'Unsupported arguments';
        }
    }
    
    write() {
        let out = this.normal.write();
        
        for (let k = 0; k < 3; k++) {
            out += this.vertices[k].write();
        }
        out += parser.fromShort(0);
        return out;
    }
}


