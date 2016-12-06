import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export const RxTab = new BehaviorSubject<string>('general');

@Component({
  selector: 'report-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class ReportTabComponent {
  active: string = 'general';
  tabs = [{
    name: 'general',
    title: 'TỔNG QUAN'
  }, {
    name: 'time',
    title: 'THỜI GIAN GIAO DỊCH',
  }, {
    name: 'customer',
    title: 'KHÁCH HÀNG ĐÁNH GIÁ'
  }]

  SetActive(t: { name: string }) {
    this.active = t.name;
    RxTab.next(t.name);
  }
}