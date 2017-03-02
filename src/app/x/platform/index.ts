
declare var nodeRequire: any;
declare var process: any;

function GetUser2() {
    var who: string = nodeRequire('child_process').execSync("whoami", { encoding: 'utf8', timeout: 1000 });
    var parts = who.split("\\");
    var username = parts[parts.length - 1];
    console.log("username", username);
    return String(username).trim();
}

function GetUser1() {
    var process = nodeRequire('process');
    console.log("env", process.env);
    return process.env['USERNAME'];
}

export function CurrentUser() {
    try {
        return GetUser2();
    } catch (e) {
        console.log("cannot get user from environment", e);
    }
    return null;
}

export * from './setting';