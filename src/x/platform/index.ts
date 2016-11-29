
declare var nodeRequire: any;
declare var process: any;

export function CurrentUser() {
    try {
        if (typeof process === 'undefined' && typeof nodeRequire !== 'undefined') {
            // electron
            process = nodeRequire('process');
        }
        return process.env['USERNAME'];
    } catch (e) {
        console.log("cannot get user from environment");
    }
    return null;
}

export * from './setting';