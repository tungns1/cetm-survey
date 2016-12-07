import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Tab } from './declare';

@Component({
  selector: 'monitor-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class MonitorTabComponent {
  @Output() select = new EventEmitter<Tab>();
  @Input() set tabs(v: Tab[]) {
    this._tabs = v;
    this.setActive(v[0]);
  }

  get tabs() {
    return this._tabs;
  }

  setActive(t: Tab) {
    this.active = t;
    this.select.emit(t);
  }

  private active: Tab;
  private _tabs: Tab[];
}