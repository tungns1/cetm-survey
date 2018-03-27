import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid';
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { IStaffDetail } from '../shared/staff-performance.model';

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.scss']
})
export class StaffTableComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private timeDuration: TimeDurationPipe,

  ) { }

  _data: IStaffDetail[]
  @Input() set data(d: IStaffDetail[]) {
    if (d)
      this._data = d.map((record, index) => {
        record['no'] = index + 1;
        record.first_login = this.datePipe.transform(record.first_login, 'short');
        record.last_logout = this.datePipe.transform(record.last_logout, 'short');
        record.sum_connection_time = this.timeDuration.transform(Number.parseInt(record.sum_connection_time.toString()));
        record.sum_serving_time = this.timeDuration.transform(Number.parseInt(record.sum_serving_time.toString()));
        record.avg_serving_time = this.timeDuration.transform(Number.parseInt(record.avg_serving_time.toString()));
        record.free_time = this.timeDuration.transform(Number.parseInt(record.free_time.toString()));
        record.effort = record.effort + ' %';
        return record;
      })
  }

  cellClass: string[] = ['center', 'padding-10'];

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
  }

}
