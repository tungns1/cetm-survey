import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { PercentPipe } from '@angular/common';
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { ITableData } from '../shared/appointment-performance.model';

@Component({
    selector: 'appointment-table',
    templateUrl: './appointment-table.component.html',
    styleUrls: ['./appointment-table.component.scss']
})
export class AppointmentTableComponent implements OnInit {

    _data: ITableData[];

    constructor(
        private timeDurationPipe: TimeDurationPipe, 
        private percentPipe: PercentPipe
    ) { }


    @Input() set data(d: ITableData[]) {
        if (d) {
            this._data = d.map((record, index) => {
                record['no'] = index + 1;
                record.avg_watting_time = (this.timeDurationPipe.transform(record.avg_watting_time));
                record.avg_served_time = this.timeDurationPipe.transform(record.avg_served_time);
                record.num_status_arrived = `${record.num_status_arrived} (${this.percentPipe.transform(record.num_status_arrived / record.total_appointment, '1.1-1')})`;
                record.num_arrived_late = `${record.num_arrived_late} (${this.percentPipe.transform(record.num_arrived_late / record.total_appointment, '1.1-1')})`;
                record.num_status_finished = `${record.num_status_finished} (${this.percentPipe.transform(record.num_status_finished / record.total_appointment, '1.1-1')})`;
                record.num_cancel = `${record.num_cancel} (${this.percentPipe.transform(record.num_cancel / record.total_appointment, '1.1-1')})`;
                record.avg_reserved_by_day = this.timeDurationPipe.transform(record.avg_reserved_by_day, 'day');
                return record;
            })
        }
    }


    ngOnInit() {
    }
    cellClass: string[] = ['center', 'padding-10'];

    private gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple'
    };
}
