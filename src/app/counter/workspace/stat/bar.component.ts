import { Component, Input } from '@angular/core';
import { StatMap, IStat } from '../shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'bar',
    templateUrl: 'bar.component.html',
    styleUrls: ['sta.component.scss']
})
export class BarComponent {
    @Input("data") set setData(v: StatMap) {
        if (!v) return;
        this.data$ = v.ToArray().pipe(map(data => {
            return data.sort((a, b) => a.count > b.count ? -1 : 1);
        }));
        this.max$ = v.pipe(map(_ => v.max_count));
    }

    data$: Observable<IStat[]>;
    max$: Observable<number>;
}