import { Pipe, PipeTransform } from '@angular/core';



function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    transform(v: number) {
        var hours =(v/3600).toFixed(2);
        var minutes = ((v%3600)/60).toFixed(2);
        var seconds = v%60;
        return hours + ':' + minutes + ':' + seconds;
    }
}
