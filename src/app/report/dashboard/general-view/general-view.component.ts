import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate } from '../shared';
import { PeriodFilterService } from '../../shared';
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
      d['finished'] = d['c_ft'] + ' (' + d['c_ft_p'] + '%)';
      d['cancelled'] = d['c_ct'] + ' (' + d['c_ct_p'] + '%)';
      d['standardWaiting'] = d['c_bwt'] + ' (' + d['c_bwt_p'] + '%)';
      d['exceededWaiting'] = d['c_awt'] + ' (' + d['c_awt_p'] + '%)';
      d['standardServing'] = d['c_bst'] + ' (' + d['c_bst_p'] + '%)';
      d['exceededServing'] = d['c_ast'] + ' (' + d['c_ast_p'] + '%)';
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
  };

  ngOnInit() {
    this.FilterBy();
  }
  ngOnChanges(changes) {
    if (changes.field) {
      this.info.fieldBy = this.FilterBy();
    }
  }
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
      fileName: 'generalView.csv',
    };
    console.log(typeof this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

}
