import { Pipe } from '@angular/core';
import { CacheCounter } from '../model/';

function TwoDigit(n: number): string {
    let v = Math.floor(n);
    return (v > 9 ? '' : '0') + v;
}

@Pipe({
    name: 'timeToHour'
})
export class TimeToHourPipe {
    transform(s: string) {
        return +s/3600;
    }
}


@Pipe({
    name: 'timeToHourDeviceTrack'
})
export class TimeToHourDeviceTrackPipe {
    transform(s: number) {
        if(s<0){
            return '';
        }
        return (+s/3600).toFixed(3);
    }
}

@Pipe({
    name: 'time'
})
export class TimePipe {
    transform(s: number) {
         return [s / 3600, (s % 3600) / 60, (s % 60)].map(TwoDigit).join(":");
    }
}

