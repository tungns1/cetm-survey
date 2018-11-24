import { Component, OnInit, Input } from '@angular/core';
import { BookingDetailSumary } from '../../appointment-performance/shared/appointment-performance.model';

@Component({
    selector: 'detail-progess',
    templateUrl: './detail-progess.component.html',
    styleUrls: ['./detail-progess.component.scss']
})
export class DetailProgessComponent implements OnInit {

    _data: BookingDetailSumary ;

    @Input() set data(d) {
        this._data = d;
    }
    constructor() { }

    ngOnInit() {
        this._data = {
            total_arrived : 0,
            total_booking: 0,
            total_cancel: 0,
            total_finish: 0,
            total_not_arrived: 0
        }
    }

}
