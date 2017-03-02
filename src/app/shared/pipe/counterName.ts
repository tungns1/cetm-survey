import { Pipe } from '@angular/core';
import { House } from '../model/';

@Pipe({
    name: 'counterName'
})
export class CounterNamePipe {
    transform(counter_id: string) {
        const c = House.CacheCounter.GetByID(counter_id);
        return c ? c.name : 'n/a';
    }
}