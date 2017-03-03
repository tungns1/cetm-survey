
import { Pipe, PipeTransform } from '@angular/core';
import { Number } from '../../util';

@Pipe({
    name: "timeDuration"
})
export class TimeDurationPipe implements PipeTransform {
    transform(v: number) {
        return [v / 3600, (v % 3600) / 60, v % 60].map(Number.TwoDigit).join(":");
    }
}
