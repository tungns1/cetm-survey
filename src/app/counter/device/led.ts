import { BehaviorSubject } from 'rxjs/BehaviorSubject';

let feedbackDeviceAvailable = false;

export class LedController {
    constructor(addr: number) { }
    Welcome() { }
    Stop() { }
    Show(cnum: string) { }
    Ping() { }
}

let NewLedController = function (addr: number) {
    return new LedController(addr);
}

try {
    if (window["myRequire"]) {
        var myRequire = window['myRequire'];
        NewLedController = myRequire("app/counter/led");
        console.log('led device is supported');
    }
} catch (e) {
    console.log("Fail to determine led supportability", e);
}

export {
    NewLedController
}
