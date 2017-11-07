import { Component, OnInit, Input, NgZone, AfterViewInit } from '@angular/core';
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
    private _zone: NgZone,
    private superCounterService: SuperCounterService,
  ) { }

  @Input() counter: counterDetail;
  maxServingMinute = ProjectConfig.service.max_serving_minute;
  checked = this.counter && this.counter.state === 'serving';

  ngOnInit() {
  }

  ngAfterViewInit(){
    this._zone.run(() => console.log('done'))
  }

  checkIn() {
    if (this.counter.ticketNum)
      this.superCounterService.markAsCheck(this.counter.counterID, this.counter.serving);
  }

}