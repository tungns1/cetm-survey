import { Pipe, PipeTransform } from '@angular/core';

function TwoDigit(n: number): string {
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    transform(v: number) {
        var d = new Date(v * 1000);
        return [d.getHours(), d.getMinutes(), d.getSeconds()].map(TwoDigit).join(":");
    }
}