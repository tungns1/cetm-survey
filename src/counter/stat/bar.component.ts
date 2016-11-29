import { Component, Input } from '@angular/core';

import { IStat } from '../backend/stat';
import { Observable } from 'rxjs/Observable';

const barWidth = 250;

@Component({

    selector: 'bar',
    templateUrl: 'bar.component.html'
})
export class BarComponent {
    @Input() set data(v: IStat[]) {
        this._data = v || [] ;
        const count = Math.max.apply(null, this._data.map(d => d.count));
        this.max = barWidth / count;
    }

    private _data: IStat[] = [];
    private max: number = 0;
}