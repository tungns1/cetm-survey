import { Pipe } from '@angular/core';
import { CacheCounter } from '../model/';

@Pipe({
    name: 'timeToHour'
})
export class TimeToHourPipe {
    transform(s: string) {
        return +s/3600;
    }
}