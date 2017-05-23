
import { Component, OnInit, Input } from '@angular/core';
import { Aggregate } from '../shared';
import { ExportExcelService } from '../../shared';
import { PeriodFilterService } from '../../service';
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
  ngOnChanges(changes) {
    if (changes.field) {
      this.info.fieldBy=this.FilterBy();
    }
  }
  private formatDate = timeFormat("%Y-%m-%d");
  @Input() data: Aggregate[] = [];
  @Input() field = 'branch_id';

  info = {
    fieldBy:'',
    reportName: 'Overview Report',
    image:'',
    period: {
      start: this.formatDate(this.filterService.startDate),
      end: this.formatDate(this.filterService.endDate)
    }
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx', this.info);
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

}
