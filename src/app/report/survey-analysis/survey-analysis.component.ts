import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid';
import { SurveyReportService, SurveyFilterService } from '../shared';
import { ICampaignListData } from '../shared/model/surveyDashboard';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-survey-analysis',
  templateUrl: './survey-analysis.component.html',
  styleUrls: ['./survey-analysis.component.scss']
})
export class SurveyAnalysisComponent implements OnInit {

  constructor(
    private surveyReportService: SurveyReportService,
    private surveyFilterService: SurveyFilterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  isSummary: boolean = true;
  dataForDetail: ICampaignListData[] = [];
  dataTable$ = this.surveyReportService.CampaignListData$.pipe(map(respone => {
    if (respone) {
      let result = [];
      respone.data.filter(row => { //filter by channel
        return !!this.surveyFilterService.Data.channel.find(chanel => {
          return !!row.channels.find(_chanel => _chanel === chanel)
        });
      }).forEach(row => {
        row.surveys.forEach((survey, index) => {
          if (index === 0) {
            let rowResult = JSON.parse(JSON.stringify(row));
            rowResult.surveys = survey;
            rowResult.channel = row.channels ? row.channels.join(', ') : ' ';
            result.push(rowResult);
            this.dataForDetail = JSON.parse(JSON.stringify(result));
          } else {
            let rowResult = JSON.parse(JSON.stringify(row));
            rowResult.surveys = survey;

            let rowDataForDetail = JSON.parse(JSON.stringify(rowResult));
            rowDataForDetail.channel = row.channels ? row.channels.join(', ') : ' ';
            this.dataForDetail.push(rowDataForDetail);

            Object.keys(rowResult).filter(key => key !== 'surveys').forEach(key => rowResult[key] = null);
            result.push(rowResult);
          }
        })
      })
      return result;
    }
  }));
  feedbackCountChart$ = this.surveyReportService.GeneralChart$.pipe(map(d => {
    if (d) {
      return d.feedbackCountChart.filter(line => {
        return !!this.surveyFilterService.Data.channel.find(channel => channel === line.name);
      })
    } else return [];
  }))

  private gridOptions: GridOptions = {
    rowHeight: 35,
    onCellClicked: (e) => {
      if (e.data) {
        this.router.navigate(['../surveyAnalysisDetail', JSON.stringify(this.dataForDetail[e.rowIndex])], {
          relativeTo: this.route,
          queryParamsHandling: "merge"
        });
      }
    }
  };
  cellclass: string[] = ['padding-10', 'center'];

  ngOnInit() {
  }

  refresh(e) {
    this.surveyReportService.GetAnalysisSumTable();
    this.surveyReportService.GetGeneralData();
  }

}
