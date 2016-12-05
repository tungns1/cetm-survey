var path = require('path');
var srcFolder = path.join(__dirname, "../../src");

function srcSubFolder(file) {
    var v = path.dirname(path.relative(srcFolder, file));
    console.log(v);
}

srcSubFolder(path.join(__dirname, "../../src/styles/shared"));