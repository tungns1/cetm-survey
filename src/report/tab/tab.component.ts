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
    title: 'TỔNG QUAN',
    tag: 'general'
  }, {
    name: 'time',
    title: 'THỜI GIAN GIAO DỊCH',
    tag: 'time'
  }, {
    name: 'customer',
    title: 'KHÁCH HÀNG ĐÁNH GIÁ',
    tag: 'customer'
  }]


  setActive(t: { name: string }) {
    this.active = t.name;
    RxTab.next(t.name);
    this.select.emit(t);
  }
}