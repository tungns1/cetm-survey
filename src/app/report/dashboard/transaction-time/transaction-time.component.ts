import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate, AppStorage } from '../shared';
import { GridOptions } from "ag-grid";
import { GroupByTitlePipe } from '../shared/groupBy.pipe'
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration'


@Component({
  selector: 'app-transaction-time',
  templateUrl: './transaction-time.component.html',
  styleUrls: ['./transaction-time.component.scss']
})
export class TransactionTimeComponent implements OnInit {

  cellClass: string[] = ['center', 'padding-10'];
  headerName: string;
  _data: TransactionAggregate[] = [];
  @Input() field = 'branch_id';

  @Input() set data(v: TransactionAggregate[]) {
    this._data = v;
    var nameRender = new GroupByTitlePipe();
    var timeDurationPipe = new TimeDurationPipe();
    this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['name'] = nameRender.transform(this.field, d);
      d['totalTransTime'] = timeDurationPipe.transform(d['s_tt']);

      d['totalServingTime'] = timeDurationPipe.transform(d['s_st']);
      d['totalServingTimePercent'] = d['s_st_p'] + '%';

      d['totalWaitingTime'] = timeDurationPipe.transform(d['s_wt']);
      d['totalWaitingTimePercent'] = d['s_wt_p'] + '%';

      d['servingTimeAverage'] = timeDurationPipe.transform(d['a_st']);
      d['servingTimeMin'] = timeDurationPipe.transform(d['min_st']);
      d['servingTimeMax'] = timeDurationPipe.transform(d['max_st']);

      d['waitingTimeAverage'] = timeDurationPipe.transform(d['a_wt']);
      d['waitingTimeMin'] = timeDurationPipe.transform(d['min_wt']);
      d['waitingTimeMax'] = timeDurationPipe.transform(d['max_wt']);
    });
  };

  // info = {
  //   reportName: 'Overview Report',
  //   period: {
  //     start: '31/10/91',
  //     end: '12/3/93'
  //   }
  // }

  gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
    this.headerName = this.FilterBy();
  }

  ngOnChanges(changes) {
    if (changes.field && this.gridOptions.api) {
      let newHeader: any[] = this.gridOptions.columnDefs.map(column => {
        if (column['field'] === 'name') {
          column['headerName'] = this.FilterBy();
        }
        return column;
      });
      this.gridOptions.api.setColumnDefs(newHeader);
    }
  }

  FilterBy() {
    let field_by = '';
    switch (this.field) {
      case 'service_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Dịch vụ';
        else if (AppStorage.Culture === 'sp')
            field_by = 'Servicio';
        else
            field_by = 'Service';
        break;
      case 'user_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Giao dịch viên';
        else if (AppStorage.Culture === 'sp')
            field_by = 'Cajero';
        else
            field_by = 'Teller';
        break;
      case 'counter_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Quầy';
        else if (AppStorage.Culture === 'sp')
            field_by = 'Ventanilla';
        else
            field_by = 'Counter';
        break;
      case 'branch_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Phòng giao dịch';
        else if (AppStorage.Culture === 'sp')
            field_by = 'Tienda';
        else
            field_by = 'Store';
        break;
    }
    return field_by;
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'transactionTime.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

}
