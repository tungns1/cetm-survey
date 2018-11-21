import { Injectable, OnInit } from '@angular/core';

import { MonitorSurveySocket } from './monitor-survey.socket';
import { MonitorSurVeyModel, IStoreReport, IFeedbackReport, IStaffReport } from './monitor-survey.model';
import { BehaviorSubject } from 'rxjs';
import { INameValue, CacheBranch } from '../../../../report/shared';
import { BranchFilterService } from '../../../../shared/branch/filter/filter.service';
import { ChannelFilterService } from '../../filter/channel-filter/channel-filter.service';
import { first } from 'rxjs/operators';

@Injectable()
export class MonitorSummaryService {

  constructor(
    private socket: MonitorSurveySocket,
    private branchFilterService: BranchFilterService,
    private channelFilterService: ChannelFilterService
  ) { }

  isStoreChannel$ = new BehaviorSubject<boolean>(null);
  storeReportData$ = new BehaviorSubject<IStoreReport[]>([]); //first table in summary
  staffReportData$ = new BehaviorSubject<IStaffReport[]>([]); //poor staff list in summary

  poorFeedbackData$ = new BehaviorSubject<IFeedbackReport[]>([]);
  otherFeedbackData$ = new BehaviorSubject<IFeedbackReport[]>([]);

  sumChartData$ = new BehaviorSubject<INameValue[]>([]);
  feedbackCountByStaffChart$ = new BehaviorSubject<INameValue[]>([]);
  feedbackAverageByStaffChart$ = new BehaviorSubject<INameValue[]>([]);
  detailByCurrentStoreChart$ = new BehaviorSubject<INameValue[]>([]);
  feedbackRatioChart$ = new BehaviorSubject<INameValue[]>([]);
  private socketMessage$ = this.socket.message$;
  private sumSurvey = new MonitorSurVeyModel();

  ngOnInit() {
    this.socket.onInit();

    this.socketMessage$.subscribe(message => {
      if (message) {
        this.sumSurvey.UpdateData(message);
        this.refreshData()
      }
    })
  }

  private refreshData() {
    this.storeReportData$.next(this.sumSurvey.StoreReport.filter(store => {
      return CacheBranch.GetByLevel(0).filter(branch => {
        return this.branchFilterService.getByLevel(0).find(selectedBranch => selectedBranch === branch.id)
      }).find(branch => branch.name === store.actor);
    }));
    this.staffReportData$.next(this.sumSurvey.StaffReport.filter(staff => {
      return CacheBranch.GetByLevel(0).filter(branch => {
        return this.branchFilterService.getByLevel(0).find(selectedBranch => selectedBranch === branch.id)
      }).find(branch => branch.name === staff.store);
    }));
    this.channelFilterService.Data$.pipe(first()).subscribe(data => {
      if (data.channel) {
        if (!data.channel.find(c => c === 'store') || data.channel.length > 1) {
          setTimeout(() => {
            this.sumChartData$.next(this.sumSurvey.getChartDataByChannel(
              this.channelFilterService.Data.channel
            ));
            this.poorFeedbackData$.next(this.sumSurvey.PoorFeedback.filter(record =>
              this.channelFilterService.Data.channel.find(channel => channel === record.channel)
            ));
            this.otherFeedbackData$.next(this.sumSurvey.OtherFeedback.filter(record =>
              this.channelFilterService.Data.channel.find(channel => channel === record.channel)
            ));
          });
        } else {
          this.sumChartData$.next(this.sumSurvey.getChartDataByStore(
            CacheBranch.GetByLevel(0).filter(store => this.branchFilterService.getByLevel(0).find(ID => store.id === ID)).map(store => store.name)
          ));
          this.poorFeedbackData$.next(this.sumSurvey.PoorFeedback.filter(poorFeedback => {
            return CacheBranch.GetByLevel(0).filter(stores => this.branchFilterService.getByLevel(0).find(ID => stores.id === ID))
              .find(data => data.name === poorFeedback.store);
          }));
        }
      }
    })
  }

  set FeedbackConfig(data) {
    this.sumSurvey.FeedbackConfig = data;
  }

  updateChartDetailByStore(curentStoreName: string) {
    this.feedbackCountByStaffChart$.next(this.sumSurvey.getFeedbackCountByStaffChart(curentStoreName));
    this.feedbackAverageByStaffChart$.next(this.sumSurvey.getFeedbackAverageByStaffChart(curentStoreName));
    this.detailByCurrentStoreChart$.next(this.sumSurvey.getChartDataByStore([curentStoreName]));
    this.feedbackRatioChart$.next(this.sumSurvey.getFeedbackRatioChart([curentStoreName]))
  }

  ngOnDestroy() {
    this.socket.onDestroy();
  }

}
