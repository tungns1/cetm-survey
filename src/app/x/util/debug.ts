let debug = false;

export function IsDebug() {
    return debug;
}

export function EnableDebug() {
    debug = true;
}

window['Debug'] = EnableDebug;