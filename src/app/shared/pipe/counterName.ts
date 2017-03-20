import { Pipe } from '@angular/core';
import { CacheCounter } from '../model/';

@Pipe({
    name: 'counterName'
})
export class CounterNamePipe {
    transform(counter_id: string) {
        const c = CacheCounter.GetByID(counter_id);
        return c ? c.name : 'n/a';
    }
}