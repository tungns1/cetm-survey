import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SurveyReportService, IDetailSurvey } from '../../shared';

@Component({
  selector: 'app-survey-analysis-detail',
  templateUrl: './survey-analysis-detail.component.html',
  styleUrls: ['./survey-analysis-detail.component.scss']
})
export class SurveyAnalysisDetailComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private surveyReportService: SurveyReportService
  ) { }

  sumInfo = JSON.parse(this.route.snapshot.params["survey"]);
  detailData: IDetailSurvey[];

  ngOnInit() {
    this.surveyReportService.GetAnalysisDetail(this.sumInfo.surveys.id).subscribe(res => {
      this.detailData = res.data;
    })
  }

  goBack() {
    this.location.back();
  }

}
