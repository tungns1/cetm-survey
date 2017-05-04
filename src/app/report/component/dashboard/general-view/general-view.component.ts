import { Component, OnInit, Input } from '@angular/core';
import { Aggregate } from '../shared';
import { ExportExcelService } from '../../shared';
import { PeriodFilterService } from '../../shared';
import { timeFormat, timeParse } from 'd3-time-format';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  constructor(
    private exportService: ExportExcelService,
    private filterService: PeriodFilterService
  ) { }

  ngOnInit() {
    this.FilterBy()
  }
  private formatDate = timeFormat("%Y-%m-%d");
  @Input() data: Aggregate[] = [];
  @Input() field = 'branch_id';
  field_by: string;
  info = {
    period: {
      start: this.formatDate(this.filterService.startDate),
      end: this.formatDate(this.filterService.endDate)
    }
  }
  ngOnChanges(changes) {
    if (changes.field) {
      this.field_by=this.FilterBy();
    }
  }

  excel(e) {
    this.ExportExcel(e);
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
  ExportExcel(e) {
    e.preventDefault();
    let now = new Date;
    let ddmmyy: string = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('tableEl');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');
    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'general_table_' + ddmmyy + '.xls';
    a.click();
  }

}
