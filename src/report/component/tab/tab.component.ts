import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxTab = new BehaviorSubject<string>('general');

@Component({
  selector: 'report-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class ReportTabComponent {
  active: string = 'general';
  @Output() select = new EventEmitter();
  tabs = [{
    name: 'general',
    title: 'GENERAL.TAB_GENERAL',
    tag: 'general'
  }, {
    name: 'time',
    title: 'GENERAL.TAB_TIME_TRANSACTION',
    tag: 'time'
  }, {
    name: 'customer',
    title: 'GENERAL.TAB_CUSTOMER_FEEDBACK',
    tag: 'customer'
  }]


  setActive(t: { name: string }) {
    this.active = t.name;
    RxTab.next(t.name);
    this.select.emit(t);
  }
}