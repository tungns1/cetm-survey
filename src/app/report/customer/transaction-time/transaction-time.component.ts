import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../shared';
import { CustomerView } from '../shared';

@Component({
  selector: 'app-transaction-time',
  templateUrl: './transaction-time.component.html',
  styleUrls: ['./transaction-time.component.scss']
})
export class TransactionTimeComponent implements OnInit {

  ngOnInit() {
  }

  @Input() data: CustomerView;

}
