import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate } from '../shared';
import { PeriodFilterService, AppStorage } from '../../shared';
import { timeFormat, timeParse } from 'd3-time-format';
import { GridOptions } from "ag-grid";
import { GroupByTitlePipe } from '../shared/groupBy.pipe'

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  constructor(
    private filterService: PeriodFilterService
  ) { }

  cellClass: string[] = ['center', 'padding-10'];

  @Input() field = 'branch_id';
  private formatDate = timeFormat("%Y-%m-%d");
  protected _data: TransactionAggregate[] = [];
  @Input() set data(v: TransactionAggregate[]) {
    this._data = v;
    var nameRender = new GroupByTitlePipe();
    this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['name'] = nameRender.transform(this.field, d);
      d['finishedPercent'] = d['c_ft_p'] + '%';
      d['cancelledPercent'] = d['c_ct_p'] + '%';
      d['standardWaitingPercent'] = d['c_bwt_p'] + '%';
      d['exceededWaitingPercent'] = d['c_awt_p'] + '%';
      d['standardServingPercent'] = d['c_bst_p'] + '%';
      d['exceededServingPercent'] = d['c_ast_p'] + '%';
    });
  };


  info = {
    fieldBy: '',
    reportName: 'Overview Report',
    image: '',
    period: {
      start: this.formatDate(this.filterService.startDate),
      end: this.formatDate(this.filterService.endDate)
    }
  }

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
    this.FilterBy();
  }

  ngOnChanges(changes) {
    if (changes.field) {
      this.info.fieldBy = this.FilterBy();
      if (this.gridOptions.api) {
        let newHeader: any[] = this.gridOptions.columnDefs.map(column => {
          if(column['field'] === 'name'){
            column['headerName'] = this.info.fieldBy;
          }
          return column;
        });
        this.gridOptions.api.setColumnDefs(newHeader);
      }
    }
  }

  FilterBy() {
    let field_by = '';
    switch (this.field) {
      case 'service_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Dịch vụ';
        else
            field_by = 'Service';
        break;
      case 'user_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Giao dịch viên';
        else
            field_by = 'Teller';
        break;
      case 'counter_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Quầy';
        else
            field_by = 'Counter';
        break;
      case 'branch_id':
        if (AppStorage.Culture === 'vi')
            field_by = 'Phòng giao dịch';
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
      fileName: 'generalView.csv',
    };
    console.log(typeof this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

}
