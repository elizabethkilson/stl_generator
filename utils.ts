
export var parser = new BinaryParser();

export function split_length(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
