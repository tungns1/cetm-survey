import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ReportViewService, NavService } from '../../shared';
import { MAIN_TABS } from '../shared';

@Component({
  selector: 'report-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class ReportTabComponent {
  constructor(
    private viewService: ReportViewService,
    private navService: NavService
  ) { }

  ngOnInit() {
    this.active = this.viewService.Current.GetTab();
    if (!this.active) {
      this.setActive(this.tabs[0]);
    }
  }

  tabs = [MAIN_TABS.SERVICE, MAIN_TABS.TIME, MAIN_TABS.STORE,MAIN_TABS.FREQUENCY];

  setActive(t: { name: string }) {
    this.active = t.name;
    this.viewService.SetTab(t.name);
    this.navService.SyncView();
  }

  private active: string;
}