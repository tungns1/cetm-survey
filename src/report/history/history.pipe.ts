import { Pipe } from '@angular/core';

@Pipe({
    name: "duration"
})
export class DurationPipe {
    transform(t: number) {
        return [t / 3600, (t % 3600) / 60, t % 60].join(":");
    }
}

@Pipe({
    name: "ctimeDate"
})
export class CTimeDatePipe {
    transform(v: string) {
        var d = new Date(v);
        return [d.getFullYear(), d.getMonth(), d.getDate()].join("-");
    }
}