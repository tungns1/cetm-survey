import { Component, OnInit, Input } from '@angular/core';
import { TransactionAggregate } from '../shared';

@Component({
  selector: 'app-transaction-time',
  templateUrl: './transaction-time.component.html',
  styleUrls: ['./transaction-time.component.scss']
})
export class TransactionTimeComponent implements OnInit {

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

}
