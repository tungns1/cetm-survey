import { Component, OnInit, Input } from '@angular/core';
import {
  trigger, state, style,
  animate, transition
} from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ticket } from '../../../shared/model/house';
import { SuperCounterService } from '../shared/service';
import { ProjectConfig } from '../../shared'
import { counterDetail } from '../shared/model';

@Component({
  selector: 'app-counter-detail',
  templateUrl: './counter-detail.component.html',
  styleUrls: ['./counter-detail.component.scss'],
})
export class CounterDetailComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
  ) { }

  _counter: counterDetail;
  @Input() set counter(c: counterDetail) {
    this._counter = c;
    let header = document.getElementById('counterDetailHeader');
    if (header) {
      header.classList.remove('fadeIn');
      setTimeout(_ => {
        header.classList.add('fadeIn');
      })
    }

  };
  maxServingMinute = ProjectConfig.service.max_serving_minute;
  checked = this._counter && this._counter.state === 'serving';

  ngOnInit() {
  }

  checkIn() {
    if (this._counter.ticketNum)
      this.superCounterService.markAsCheck(this._counter.counterID, this._counter.serving);
  }

}