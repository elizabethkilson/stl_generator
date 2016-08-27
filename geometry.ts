
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
        let out = parser.fromFloat(x);
        out += parser.fromFloat(y);
        out += parser.fromFloat(z);
        return out;
    }
}

function cross_product(point1: Point, point2: Point) {
    let x = point1.y * point2.z - point1.z * point2.y;
    let y = point1.z * point2.x - point1.x * point2.z;
    let z = point1.x * point2.y - point1.y * point2.x;
    return new Point(x, y, z);
}

function calculate_normal([a: Point, b: Point, c: Point]) {
    let v1 = new Point(b.x - a.x, b.y - a.y, b.z - a.z);
    let v2 = new Point(c.x - a.x, c.y - a.y, c.z - a.z);
    return cross_product(v1, v2);
}

export const binaryTriangleSize = 50;

export class Triangle {
    vertices: [Point, Point, Point]
    normal: Point
    
    constructor(arg: string);
    constructor(arg: [Point, Point, Point]) {
        if (arg instanceof Array) {
            this.vertices = arg;
            this.normal = calculate_normal(this.vertices);
        }
        else {
            let pieces = split_length(arg, 4);
            
            this.normal = new Point(pieces[0], pieces[1], pieces[2]);
            let vertices = [];
            for (let i = 3; i < pieces.length; i += 3) {
                vertices.push(new Point(pieces[i], pieces[i+1], pieces[i+2]));
            }
            this.vertices = vertices;
        }
    }
    
    write() {
        let out = normal.write();
        
        for (let k = 0; k < 3; k++) {
            out += vertices[k].write();
        }
        out += parser.fromShort(0);
        return out;
    }
}


