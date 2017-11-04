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
  @Input() selected;
  private subscription: Subscription;
  private oneSecond = interval(1000).share();
  private maxServingMinute = ProjectConfig.service.max_serving_minute;

  @Input() set counter(v: counterDetail) {
    this._counter = v;
    this.subscription = this.oneSecond.subscribe(_ => {
      this.setServeLong(Number(this._counter.serveTime), this.maxServingMinute)
    });
  };

  ngOnInit() {
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  setServeLong(start: number, maxServing: number) {
    if (!start) { 
      this._counter['serveLong'] = false; 
      return; 
    }
    (Date.now() / 1000 - start) % 3600 / 60 > maxServing ? this._counter['serveLong'] = true : this._counter['serveLong'] = false;
  }

}
