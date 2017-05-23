import { Component, OnInit, Input } from '@angular/core';

import { ExportExcelService } from '../../shared';
import { Customer } from '../../shared';

@Component({
  selector: 'app-transaction-time',
  templateUrl: './transaction-time.component.html',
  styleUrls: ['./transaction-time.component.scss']
})
export class TransactionTimeComponent implements OnInit {

  constructor(
    private exportService: ExportExcelService
  ) { }

  ngOnInit() {
  }

  @Input() data: Customer;

  excel() {
    this.exportService.exportExcel('tableEl', 'miraway', 'xlsx',"");
  }

}
