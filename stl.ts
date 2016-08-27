import {Triangle, binaryTriangleSize} from "./geometry.ts";
import {parser, split_length} from "./utils.ts";

const binaryNameLength = 80;

class Object {
    surfaces: Array<Triangle>
    name: string
    count: number
    
    constructor() {
    
    }
    
    readBin(binStr: string) {
        this.name = binStr.substring(0, binaryNameLength).strip();
        this.count = parser.decodeInt(binStr.substring(binaryNameLength, binaryNameLength + 4), 32, false);
        let data = binStr.substring(binaryNameLength + 4, binStr.length);
        
        let pieces = split_length(binStr, binaryTriangleSize);
        this.surfaces = pieces.map(str => new Triangle(str));
    }
    
    write() {
        let out = this.name + (Array(binaryNameLength - name.length).join(" "));
        out += parser.fromInt(this.count);
        
        this.surfaces.forEach(function(surface) {
            out += surface.write();
        });
        
        var bytes = new Uint8Array(out.length);
        for (var i=0; i<out.length; i++) {
            bytes[i] = out.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
