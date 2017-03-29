import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ReportViewService, ReportNavService } from '../../shared';
import { MAIN_TABS } from '../shared';

@Component({
  selector: 'report-tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.scss']
})
export class ReportTabComponent {
  constructor(
    private viewService: ReportViewService,
    private navService: ReportNavService
  ) { }

  ngOnInit() {
      this.setActive('time');
  }

  setActive( name: string ) {
    this.active = name;
    this.viewService.SetTab(name);
  }

  private active: string;
}