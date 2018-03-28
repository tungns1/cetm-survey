import { Component, OnInit, Input } from '@angular/core';
import { IStaffSum } from '../shared/staff-performance.model';

@Component({
  selector: 'app-staff-sum',
  templateUrl: './staff-sum.component.html',
  styleUrls: ['./staff-sum.component.scss']
})
export class StaffSumComponent implements OnInit {

  constructor() { }

  _data: IStaffSum;

  @Input() set data(d) { this._data = d }

  ngOnInit() {
  }

}
