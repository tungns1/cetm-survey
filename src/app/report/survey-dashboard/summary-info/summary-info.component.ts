import { Component, OnInit, Input } from '@angular/core';
import { FeedbackSurveyService } from '../../../admin/service';

@Component({
  selector: 'app-summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.scss']
})
export class SummaryInfoComponent implements OnInit {

  constructor(
    private feedbackSurveyService: FeedbackSurveyService,
  ) { }

  @Input() data;
  pointConfig: {
    high_rate: number,
    credit_rate: number,
    medium_rate: number
  } = { high_rate: null, credit_rate: null, medium_rate: null };

  ngOnInit() {
    this.feedbackSurveyService.GetFeedbackUI().subscribe(configData => {
      this.pointConfig = configData;
      setTimeout(_ => {
        this.changeColorAveragePoint();
      })
    })
  }

  private changeColorAveragePoint() {
    let HTMLEL = document.getElementById('averagePointChart');
    if (HTMLEL) {
      if (this.pointConfig.medium_rate > this.data.average_point) {
        HTMLEL.style.filter = 'hue-rotate(150deg) saturate(5)';
      }
      if (this.pointConfig.credit_rate > this.data.average_point && this.data.average_point >= this.pointConfig.medium_rate) {
        HTMLEL.style.filter = 'hue-rotate(180deg) saturate(5)';
      }
      if (this.pointConfig.high_rate > this.data.average_point && this.data.average_point >= this.pointConfig.credit_rate) {
        HTMLEL.style.filter = 'hue-rotate(-120deg) saturate(2)';
      }
      if (this.data.average_point >= this.pointConfig.high_rate) {
        HTMLEL.style.filter = 'hue-rotate(00deg) saturate(1)';
      }
    }
  }

}
