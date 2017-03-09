const spawn = require("child_process").spawn;
const process = require('process');
const INTERVAL = 30000;

function update() {
    const child = spawn("git", ["pull", "origin", "master"]);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    console.log("updating...\n");
}

update();
setInterval(update, INTERVAL);