import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ITicket } from '../model';

let onServing = (tickets: ITicket[]) => {}

try {
    var myRequire = window['myRequire'];
    var recorder = myRequire('app/counter/recorder');
    console.log("Record is supported");
    recorder.EnableRecorder();
    onServing = recorder.OnServing;
} catch (e) {
    console.log("Fail to determine recorder supportability", e);
}

export function SendToRecorder(tickets: ITicket[]) {
    onServing(tickets);
}
