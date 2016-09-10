
console.log("Hello world");

import {Structure} from './stl.ts';


function readFile(e: any) {
    console.log("readFile");
    var file: any = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e: any) {
        console.log("got file");
        var contents = e.target.result;
        console.log("content length", contents.length);
        console.log("content type", typeof(contents));
        var obj = new Structure();
        console.log("reading");
        obj.readBin(contents);
        console.log("read");
        console.log(obj.name);
        console.log(obj.count);
        console.log(obj.surfaces.length);
    };
    reader.readAsBinaryString(file);
}

window.onload = function() {
    document.getElementById('file-input').addEventListener('change', readFile, false);
};
