import { Component, OnInit, Input } from '@angular/core';
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { IAppoitmentSum } from '../shared/appointment-performance.model';

@Component({
    selector: 'appointment-sum',
    templateUrl: './appointment-sum.component.html',
    styleUrls: ['./appointment-sum.component.scss']
})
export class AppointmentSumComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    _data: IAppoitmentSum;

    @Input() set data(d) { 
        this._data = d;
    }

}
