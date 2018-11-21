import { Component, OnInit } from '@angular/core';
import { MonitorSummaryService } from './shared/monitor-survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  constructor(
    private sumService: MonitorSummaryService
  ) { }

  ngOnInit() {
    this.sumService.ngOnInit();
  }

  ngOnDestroy() {
    this.sumService.ngOnDestroy();
  }

}
