import { Component, Input } from '@angular/core';
import { StatMap, IStat } from '../shared';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'bar',
    templateUrl: 'bar.component.html',
    styleUrls: ['sta.component.scss']
})
export class BarComponent {
    @Input("data") set setData(v: StatMap) {
        if (!v) return;
        console.log("set data", v);
        this.data$ = v.ToArray().map(data => {
            return data.sort((a, b) => a.count > b.count ? -1 : 1);
        });
        this.max$ = v.map(_ => v.max_count);
    }

    data$: Observable<IStat[]>;
    max$: Observable<number>;
}