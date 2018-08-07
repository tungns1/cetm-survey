import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription ,  interval } from 'rxjs';

import { counterDetail } from '../../shared/model';
import { ProjectConfig } from '../../../shared';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-counter-cell',
  templateUrl: './counter-cell.component.html',
  styleUrls: ['./counter-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterCellComponent implements OnInit {

  constructor() { }

  _counter: counterDetail;
  @Input() selected;
  serve_long = false;

  private subscription: Subscription;
  private maxServingMinute = ProjectConfig.service.max_serving_minute;
  oneSecond$ = interval(1000).pipe(share());

  @Input() set counter(v: counterDetail) {
    this._counter = v;
    this.setServeLong(Number(this._counter.serveTime), this.maxServingMinute);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.oneSecond$.subscribe(_ => {
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
      this.serve_long = false;
      return;
    }
    this.serve_long = ((Date.now() / 1000 - start) / 60) > maxServing;
  }

}
