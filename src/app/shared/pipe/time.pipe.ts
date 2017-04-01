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
