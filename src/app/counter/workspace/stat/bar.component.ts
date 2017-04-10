import { Component, Input } from '@angular/core';
import { IStat } from '../shared';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'bar',
    templateUrl: 'bar.component.html',
    styleUrls: ['sta.component.scss']
})
export class BarComponent {
    @Input() set data(v: IStat[]) {
        this._data = v || [] ;
        const count = Math.max.apply(null, this._data.map(d => d.count));
        this.max = count;
    }
    private _data: IStat[] = [];
    private max: number = 0;
}