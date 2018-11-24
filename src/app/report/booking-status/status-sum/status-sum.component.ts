import { Component, OnInit, Input } from '@angular/core';
import { IStatus } from '../../appointment-performance/shared/appointment-performance.model';

@Component({
    selector: 'status-sum',
    templateUrl: './status-sum.component.html',
    styleUrls: ['./status-sum.component.scss']
})
export class StatusSumComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    _data: IStatus;
    
    @Input() set data(d) { 
        this._data = d;
    }
}
