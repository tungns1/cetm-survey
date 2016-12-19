
import { Pipe, PipeTransform } from '@angular/core';

function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "ctimeDate"
})
export class CTimeDatePipe {
    transform(v: string) {
        var d = new Date(+v * 1000);
        return [d.getHours(), d.getMinutes(), d.getSeconds()].map(TwoDigit).join(":");

    }
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    transform(v: number) {
        return [v / 3600, (v % 3600) / 60, v % 60].map(TwoDigit).join(":");
    }
}

