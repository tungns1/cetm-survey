import { Component, OnInit, Input } from '@angular/core';
import { IStatus } from '../../appointment-performance/shared/appointment-performance.model';
import { PercentPipe } from '@angular/common';
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { GridOptions } from 'ag-grid';

@Component({
    selector: 'status-table',
    templateUrl: './status-table.component.html',
    styleUrls: ['./status-table.component.scss']
})
export class StatusTableComponent implements OnInit {

    constructor(private percentPipe: PercentPipe, private timeDuration: TimeDurationPipe) { }
    _data:IStatus[] = []
    ngOnInit() {
    }
    @Input() set data(d: IStatus[]) {
        if (d) {
            this._data = d.map((record, index) => {
                record['no'] = index + 1;
                record['new'] = record.total_create_new > 0 ? `${record.total_create_new} (${this.percentPipe.transform(record.total_create_new/record.total_booking,'1.1-1')})` : 0
                record['cancel'] = record.total_cancel > 0 ? `${record.total_cancel} (${this.percentPipe.transform(record.total_cancel/record.total_booking,'1.1-1')})` : 0
                record['update'] = record.total_update > 0 ? `${record.total_update} (${this.percentPipe.transform(record.total_update/record.total_booking,'1.1-1')})` : 0
                record['avg_res'] = this.timeDuration.transform(record.average_reservation_by_day,'day');
                record['avg_res_cancel'] = this.timeDuration.transform(record.average_reservation_from_cancel_to_appointment_by_day,'day');
                return record;
            })
        }
    }
    cellClass: string[] = ['center', 'padding-10'];

    public gridOptions: GridOptions = {
        rowHeight: 35,
    };
}
