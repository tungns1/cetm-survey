
import { Pipe, PipeTransform } from '@angular/core';
import { Number } from '../../util';

@Pipe({
    name: "localDayTime"
})
export class LocalDayTimePipe implements PipeTransform {
    transform(v: string) {
        if (+v > 0) {
            var d = new Date(+v * 1000);
            return [d.getHours(), d.getMinutes(), d.getSeconds()].map(Number.TwoDigit).join(":");
        } else {
            return "00:00:00";
        }

    }
}