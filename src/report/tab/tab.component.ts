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
    title: 'TỔNG QUAN',
    number: 'Tổng số GD',
    success: 'GD Thành công',
    error: 'GD Hủy',
    time: 'TG Đợi chuẩn',
    times: 'TG Đợi vượt chuẩn',
    serve: 'TG Phục vụ chuẩn',
    serves: 'TG Phục vụ vượt chuẩn'
  }, {
    name: 'time',
    title: 'THỜI GIAN GIAO DỊCH',
    time: 'TG Giao dịch',
    timeServe: 'TG Phục vụ',
    timeWait: 'TG Đợi',
    timeServeTB: 'TG Phục vụ trung bình',
    timeServeMin: 'TG Phục vụ nhỏ nhất',
    timeServeMax: 'TG Phục vụ lớn nhất',
    timeWaitTB: 'TG Đợi trung bình',
    timeWaitMin: 'TG Đợi nhỏ nhất',
    timeWaitMax: 'TG Đợi lớn nhất'
  }, {
    name: 'customer',
    title: 'KHÁCH HÀNG ĐÁNH GIÁ',
    feedback: 'Tổng số phản hồi',
    noFeedback: 'Tổng số không phản hồi',
    good: 'Tốt',
    kha: 'Khá',
    average: 'Trung bình',
    bad: 'Kém'
  }]

  SetActive(t: { name: string }) {
    this.active = t.name;
    RxTab.next(t.name);
  }
}