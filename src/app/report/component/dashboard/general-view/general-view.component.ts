import { Component, OnInit, Input } from '@angular/core';
import { Aggregate } from '../shared';
import { ExportExcelService } from '../../shared';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  constructor(
    private exportService: ExportExcelService
  ) { }

  ngOnInit() {
  }

  @Input() data: Aggregate[] = [];
  @Input() field = 'branch_id';

  info = {
    reportName: 'Overview Report',
    period: {
      start: '31/10/91',
      end: '12/3/93'
    }
  }

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx', this.info);
  }

}
