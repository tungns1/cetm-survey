import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';

import { counterDetail } from '../shared/model';
import { ProjectConfig } from '../../shared';

@Component({
  selector: 'app-counter-cell',
  templateUrl: './counter-cell.component.html',
  styleUrls: ['./counter-cell.component.scss']
})
export class CounterCellComponent implements OnInit {

  constructor() { }

  _counter: counterDetail;
  // private subscription: Subscription;
  // private oneSecond = interval(1000).share();
  // private maxServingMinute = ProjectConfig.service.max_serving_minute;

  @Input() set counter(v: counterDetail) {
    // console.log('aaaaaaaaa')
    this._counter = v;
    // if (this._counter.ticketNum) {
    //   console.log('bbbbbbbbbbb')
    //   this.subscription = this.oneSecond.subscribe(_ => {
    //     this.setServeLong(Number(this._counter.serveTime), this.maxServingMinute)
    //   });
    // } else {
    //   if (this.subscription) {
    //     console.log('ddddddddddd')
    //     this.subscription.unsubscribe();
    //     this.subscription = null;
    //   }
    // }
  };

  ngOnInit() {
    // console.log(this.counter)
  }

  // setServeLong(start: number, maxServing: number) {
  //   console.log(Date.now() - start);
  //   // Date.now() / 1000 - ((start % 3600) / 60) > maxServing ? this._counter['serveLong'] = true : this._counter['serveLong'] = false;
  //   ((Date.now() - start) % 3600) / 60 > maxServing ? this._counter['serveLong'] = true : this._counter['serveLong'] = false;
  // }

}
