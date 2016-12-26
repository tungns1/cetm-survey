import { Pipe, PipeTransform } from '@angular/core';



function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    transform(v: string) {
        return [+v / 3600, (+v % 3600) / 60, +v % 60].map(TwoDigit).join(":");
    }
}
