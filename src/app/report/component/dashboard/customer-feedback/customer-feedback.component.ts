import { Component, OnInit, Input } from '@angular/core';
import { Aggregate } from '../shared';
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

  @Input() data: Aggregate[] = [];
  @Input() field = 'branch_id';

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx');
  }
}
