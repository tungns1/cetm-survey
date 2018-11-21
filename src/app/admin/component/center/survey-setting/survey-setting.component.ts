import { Component } from '@angular/core';

@Component({
  selector: 'app-survey-setting',
  templateUrl: './survey-setting.component.html',
  styleUrls: ['./survey-setting.component.scss']
})
export class SurveySettingComponent {
  constructor() { }

  selectedTab: number = 0;

  onTabChange(ev){
    this.selectedTab = ev.index;
  }

}