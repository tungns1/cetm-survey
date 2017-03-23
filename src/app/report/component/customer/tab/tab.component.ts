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
      this.setActive('time');
  }

  tabs = [MAIN_TABS.TIME,MAIN_TABS.FREQUENCY,MAIN_TABS.SERVICE, MAIN_TABS.STORE];

  setActive( name: string ) {
    this.active = name;
    this.viewService.SetTab(name);
    this.navService.SyncView();
  }

  private active: string;
}