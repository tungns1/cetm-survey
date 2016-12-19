
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: "ctimeDate"
})
export class CTimeDatePipe {
    transform(v: string) {
        if (+v>1000) {
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
            time = dd + '-' + mm + '-' + yyyy + ', ' + h + ':' + min + ':' + s + ' ' + ampm;

            return time;
        }else{
            return "n/a";
        }
    }
}

