import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MonitorSummaryService } from '../shared/monitor-survey.service';
import { IStoreReport } from '../shared/monitor-survey.model';
import { Observable } from 'rxjs';
import { FeedbackSurveyService } from '../../../../admin/service';
import { TranslateService } from '../../../../shared/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monitorSummaryService: MonitorSummaryService,
    private feedbackSurveyService: FeedbackSurveyService,
    private translateService: TranslateService
  ) { }

  storeName = this.route.snapshot.params["store"];
  curentStore: IStoreReport;
  pointConfig;
  paddingFeedbackCount: Observable<number>;
  paddingFeedbackAverage: Observable<number>;
  chartCountFilter: number = -5;
  chartAverageFilter: number = -5;
  detailByCurrentStoreChart$ = this.monitorSummaryService.detailByCurrentStoreChart$;
  feedbackRatioChart$ = this.monitorSummaryService.feedbackRatioChart$
  feedbackCountByStaffChart$ = this.monitorSummaryService.feedbackCountByStaffChart$.pipe(map(data => {
    data.map(el => { el.name = el.name || ' '; return el });
    if (this.chartCountFilter == 5) {
      return data.slice(0, 5)
    }
    if (this.chartCountFilter == -5) {
      return data.slice(-5).sort((a, b) => a.value - b.value)
    }
    return data;
  }));

  feedbackAverageByStaffChart$ = this.monitorSummaryService.feedbackAverageByStaffChart$.pipe(map(data => {
    data.map(el => { el.name = el.name || ' '; return el });
    if (this.chartAverageFilter == 5) {
      return data.slice(0, 5)
    }
    if (this.chartAverageFilter == -5) {
      return data.slice(-5).sort((a, b) => a.value - b.value)
    }
    return data;
  }));
  poorFeedback$ = this.monitorSummaryService.poorFeedbackData$.pipe(map(poorFeedbackList => {
    return poorFeedbackList.filter(poorFeedback => poorFeedback.store === this.storeName)
  }))
  otherFeedback$ = this.monitorSummaryService.otherFeedbackData$.pipe(map(otherFeedbackList => {
    return otherFeedbackList.filter(otherFeedback => {
      return this.storeName === otherFeedback.store;
    })
  }));

  customColors = [
    {
      name: this.translateService.translate('Good'),
      value: '#86d2ff'
    },
    {
      name: this.translateService.translate('Rather'),
      value: '#a0e11e'
    },
    {
      name: this.translateService.translate('Average'),
      value: '#ff8900'
    },
    {
      name: this.translateService.translate('Poor'),
      value: '#ff687e'
    }
  ];

  ngOnInit() {
    this.feedbackSurveyService.GetFeedbackUI().subscribe(configData => {
      this.pointConfig = configData;
      this.monitorSummaryService.storeReportData$.subscribe(data => {
        this.curentStore = data.find(store => store.actor === this.storeName);
        this.paddingFeedbackCount = this.getPadding(this.feedbackCountByStaffChart$);
        this.paddingFeedbackAverage = this.getPadding(this.feedbackAverageByStaffChart$);
        this.monitorSummaryService.updateChartDetailByStore(this.storeName);
        setTimeout(_ => {
          this.changeColorAveragePoint();
        })
      })
    })
  }

  onFilterChange(actor: 'feedbackCount' | 'feedbackAverage') {
    if (actor === 'feedbackCount') {
      this.monitorSummaryService.feedbackCountByStaffChart$.next(this.monitorSummaryService.feedbackCountByStaffChart$.value);
    } else {
      this.monitorSummaryService.feedbackAverageByStaffChart$.next(this.monitorSummaryService.feedbackAverageByStaffChart$.value);
    }
  }

  setLabelFormatting = (label) => label + ' (' + this.detailByCurrentStoreChart$.value.find(el => el.name === label).value + ')';

  private changeColorAveragePoint() {
    let HTMLEL = document.getElementById('averagePointChart');
    if (HTMLEL) {
      if (this.pointConfig.medium_rate > this.curentStore.average_point) {
        HTMLEL.style.filter = 'hue-rotate(150deg) saturate(5)';
      }
      if (this.pointConfig.credit_rate > this.curentStore.average_point && this.curentStore.average_point >= this.pointConfig.medium_rate) {
        HTMLEL.style.filter = 'hue-rotate(180deg) saturate(5)';
      }
      if (this.pointConfig.high_rate > this.curentStore.average_point && this.curentStore.average_point >= this.pointConfig.credit_rate) {
        HTMLEL.style.filter = 'hue-rotate(-120deg) saturate(2)';
      }
      if (this.curentStore.average_point >= this.pointConfig.high_rate) {
        HTMLEL.style.filter = 'hue-rotate(00deg) saturate(1)';
      }
    }
  }

  private getPadding(data$: Observable<any[]>) {
    return data$.pipe(map(data => {
      switch (data.length) {
        case 1:
          return 2000;
        case 2:
          return 500;
        case 3:
          return 200;
        case 4:
          return 50;
        default:
          return 10;
      }
    }));

  }

  private goBackBranchList() {
    this.router.navigate(["../../summary"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve"
    })
  }

}
