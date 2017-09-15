import { Pipe, PipeTransform } from '@angular/core';
import { Number } from '../../util';

@Pipe({
    name: "localDayTime"
})
export class LocalDayTimePipe implements PipeTransform {
    transform(v: string | number) {
        return this.getHMS(v);
    }

    getHMS(v: string | number) {
        if (+v > 0) {
            var d = new Date(+v * 1000);
            return [d.getHours(), d.getMinutes(), d.getSeconds()].map(Number.TwoDigit).join(":");
        } else {
            return "00:00:00";
        }
    }

    getDate(v: string | number) {
        if (+v > 0) {
            var d = new Date(+v * 1000);
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");
        } else {
            return "";
        }
    }
}