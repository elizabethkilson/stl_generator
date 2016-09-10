
declare function BinaryParser(): void;
interface BinaryParser{
    (): any;
}

export var parser: any = new BinaryParser();

export function split_length(str: string, length: number) {
    let num: number = Math.floor(str.length/length);
    let ret: Array<string>  = new Array(num);
    let offset: number;

    for (let i=0; i < num; i++) {
        offset = i * length;
        ret[i] = str.substring(offset, offset + length);
    }

    return ret;
}
