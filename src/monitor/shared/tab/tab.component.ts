import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITab } from './declare';

@Component({
  selector: 'monitor-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class MonitorTabComponent {
  @Output() select = new EventEmitter<ITab>();
  @Input() set tabs(v: ITab[]) {
    this._tabs = v;
    this.setActive(v[0]);
  }

  get tabs() {
    return this._tabs;
  }

  setActive(t: ITab) {
    this.active = t;
    this.select.emit(t);
  }

  private active: ITab;
  private _tabs: ITab[];
}