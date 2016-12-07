
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "ctimeDate"
})
export class CTimeDatePipe {
    transform(v: string) {
        var d = new Date(+v * 1000),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            s = ('0' + d.getSeconds()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM	
        time =  dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ':' + s + ' ' + ampm;

        return time;
    }
}
function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

@Pipe({
    name: "hour"
})
export class HourPipe implements PipeTransform {
    transform(v: number) {
        return [v / 3600, (v % 3600) / 60, v % 60].map(TwoDigit).join(":");
    }
}

