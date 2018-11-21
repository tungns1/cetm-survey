import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { SurveyReportService, SurveyFilterService, BranchFilterService } from '../shared';
import { CacheBranch, IBranch } from '../../shared/model/org/branch';
import { FeedbackSurveyService } from '../../admin/service/shared/feedbackSurvey';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-survey-dashboard',
  templateUrl: './survey-dashboard.component.html',
  styleUrls: ['./survey-dashboard.component.scss']
})
export class SurveyDashboardComponent {

  constructor(
    private surveyDashboardService: SurveyReportService,
    private surveyFilterService: SurveyFilterService,
    private branchFilterService: BranchFilterService,
    private feedbackSurveyService: FeedbackSurveyService
  ) { }

  actorName: 'uname' | 'device' | 'store' = 'store';
  channel: string[] = [];
  selectedStore: IBranch[] = [];
  selectedDevice: any[] = [];
  highlight: 'feedbackCount' | 'averagePoint' = 'feedbackCount';
  isShowTable: boolean = true;

  data$ = this.surveyDashboardService.GeneralTableData$.pipe(map(d => {
    if (d) return d.GetSumDataByStore(
      this.actorName,
      this.selectedStore.map(store => store.name),
      this.selectedDevice.map(device => device.code),
      this.surveyFilterService.Data.user_id
    );
  }))

  dataMultiChannel$ = this.surveyDashboardService.GeneralData$.pipe(map(d => {
    if (d && d !== null) return d.GetSumDataByChannel(this.channel);
  }))

  feedbackCountChart$ = this.surveyDashboardService.GeneralChart$.pipe(map(d => d ? d.feedbackCountChart : []),map(lines => {
    return lines.filter(line => {
      return this.surveyFilterService.Data.channel.find(channel => channel === line.name)
    })
  }))

  averagePointChart$ = this.surveyDashboardService.GeneralTableData$.pipe(map(d => d ? d.StoreChart.byAverageFeedback : []),
    map(chartData => {
      return chartData.filter(column => {
        if (this.actorName === 'store') {
          return this.selectedStore.find(branch => branch.name === column.name);
        } else if (this.actorName === 'device') {
          return this.selectedDevice.find(device => device.code === column.name);
        } else {
          return this.surveyFilterService.selectedUser$.value.find(user => user === column.name);
        }
      })
    }))

  multiChannelAverageChart$ = this.surveyDashboardService.GeneralData$.pipe(map(d => {
    if (d) return d.MultiChannelChart.byAverageFeedback.filter(record => this.channel.find(c => c === record.name));
  }))

  highlightChart$ = this.surveyDashboardService.GeneralTableData$.pipe(map(d => {
    return d ? this.highlight === 'feedbackCount' ? d.StoreChart.byFeedbackCount : d.StoreChart.byAverageFeedback : [];
  }),map(chartData => {
    return chartData.filter(column => {
      if (this.actorName === 'store') {
        return this.selectedStore.find(branch => branch.name === column.name);
      } else if (this.actorName === 'device') {
        return this.selectedDevice.find(device => device.code === column.name);
      } else {
        return this.surveyFilterService.selectedUser$.value.find(user => user === column.name);
      }
    })
  }))

  multiChannelHighlightChart$ = this.surveyDashboardService.GeneralData$.pipe(map(d => {
    if (d) return d.MultiChannelChart.byFeedbackCount.filter(record => this.channel.find(c => c === record.name));
  }))

  dataTable$ = this.surveyDashboardService.GeneralTableData$.pipe(map(d => d ? d.Data ? d.Data : [] : []),map(data => {
    return data.filter(_data => {
      // filter by store
      if (this.surveyFilterService.GetActor() === 'store') {
        return this.selectedStore.find(branch => branch.name === _data.actor)
      }
      // filter by device
      if (this.surveyFilterService.GetActor() === 'device') {
        return this.selectedDevice.find(device => device.code === _data.actor)
      }
      // filter by teller
      if (this.surveyFilterService.GetActor() === 'uname') {
        return this.surveyFilterService.Data.user_id.find(fullname => fullname === _data.actor);
      }
    })
  }))

  dataMultiTable$ = this.surveyDashboardService.GeneralData$.pipe(map(data => {
    if (data)
      return data.Data.filter(row => {
        return this.channel.find(_channel => _channel === row.channel);
      });
  }));

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };
  cellclass: string[] = ['padding-10', 'center'];
  selectedTab: number = 0;

  ngOnInit() {
    this.channel = this.surveyFilterService.Data.channel;
    this.feedbackSurveyService.GetFeedbackList(CacheBranch.GetByLevel(0).map(b => b.id)).subscribe(res => {
      this.surveyFilterService.selectedDevice$.subscribe(() => {
        this.selectedDevice = res.data.filter(device => {
          return (!!this.surveyFilterService.Data.device_code.find(code => code === device.code));
        });
      })
    })
    this.branchFilterService.level0$.subscribe(() => {
      this.selectedStore = CacheBranch.GetByLevel(0).filter(branch => {
        return this.branchFilterService.getByLevel(0).find(selectedBranch => selectedBranch === branch.id)
      })
    })
  }

  refresh() {
    this.isShowTable = !this.isShowTable;
    this.channel = this.surveyFilterService.Data.channel;
    this.actorName = this.surveyFilterService.GetActor();
    setTimeout(_ => {
      this.isShowTable = !this.isShowTable;
      this.surveyDashboardService.GetGeneralData();
    });
  }

  noCellRenderer(d) {
    return d.rowIndex + 1;
  }

  onHighlightChange() {
    this.highlightChart$ = this.surveyDashboardService.GeneralTableData$.pipe(map(d => {
      return d ? this.highlight === 'feedbackCount' ? d.StoreChart.byFeedbackCount : d.StoreChart.byAverageFeedback : [];
    }))

  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'transactionTime.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }


  onTabChange(e) {
    this.selectedTab = e;
  }

}