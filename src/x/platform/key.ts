import { Subject } from 'rxjs/Subject';

const current = [];

export const CodeEnter = new Subject<string>();
var tracked = false;

export function TrackKey() {
    if (tracked) {
        return;
    }

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        var code = e.keyCode || e.which;
        addCode(code);
    });
    tracked = true;
}

function addCode(n: number) {
    if (n === 9 || n === 13) {
        done();
    } else {
        current.push(String.fromCharCode(n));
    }
}

function done() {
    CodeEnter.next(current.join(''));
    current.splice(0);
}
