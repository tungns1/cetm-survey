import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate } from '../shared';
import { ExportExcelService } from '../../shared';

@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.scss']
})
export class CustomerFeedbackComponent implements OnInit {

  constructor(
    private exportService: ExportExcelService
  ) { }

  ngOnInit() {
  }

  @Input() data: TransactionAggregate[] = [];
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
