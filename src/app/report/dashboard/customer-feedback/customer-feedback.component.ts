import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate } from '../shared';
import { GridOptions } from "ag-grid";
import { GroupByTitlePipe } from '../shared/groupBy.pipe'
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration'

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements OnInit {

  ngOnInit() {
  }

  protected _data: TransactionAggregate[] = [];
  @Input() field = 'branch_id';
  @Input() set data(v: TransactionAggregate[]) {
    this._data = v;
    var nameRender = new GroupByTitlePipe();
    var timeDurationPipe = new TimeDurationPipe();
    console.log(this._data);
    this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['name'] = nameRender.transform(this.field, d);
      d['transFeedback'] = d['c_r'] + ' (' + d['c_r_p'] + '%)';
      d['transWithoutFeedback'] = d['c_r_o'] + ' (' + d['c_r_o_p'] + '%)';

      d['veryGood'] = d['c_r_a'] + ' (' + d['c_r_a_p'] + '%)';
      d['good'] = d['c_r_b'] + ' (' + d['c_r_b_p'] + '%)';
      d['average'] = d['c_r_c'] + ' (' + d['c_r_c_p'] + '%)';
      d['poor'] = d['c_r_d'] + ' (' + d['c_r_d_p'] + '%)';
      
    });
  };

  private gridOptions: GridOptions = {
    rowHeight: 35,
  };

  FilterBy() {
    let field_by = '';
    switch (this.field) {
      case 'service_id':
        field_by = 'Service';
        break;
      case 'user_id':
        field_by = 'Teller';
        break;
      case 'counter_id':
        field_by = 'Counter';
        break;
      case 'branch_id':
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
      fileName: 'miraway.csv',
    };

    // console.log(this.gridOptions.api.getDataAsCsv(params));
  }


  // info = {
  //   reportName: 'Overview Report',
  //   period: {
  //     start: '31/10/91',
  //     end: '12/3/93'
  //   }
  // }

}
