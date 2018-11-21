import { Component, OnInit, Input } from '@angular/core';
import { TimelineReportService } from '../shared/service/timelineReport.service';
import { ITimeline } from '../shared/model/timelineReport';
import { GridOptions } from 'ag-grid';
import { TranslateService } from '../../shared/util';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor(
    private timelineReportService: TimelineReportService,
    private translateService: TranslateService
  ) { }

  customColors = [
    {
      name: this.translateService.translate('Good'),
      value: '#2e9dff'
    },
    {
      name: this.translateService.translate('Rather'),
      value: '#4fbd53'
    },
    {
      name: this.translateService.translate('Average'),
      value: '#fcc02c'
    },
    {
      name: this.translateService.translate('Poor'),
      value: '#ff1e1e'
    }
  ];

  cellclass: string[] = ['padding-10', 'center'];
  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple',
    pagination: false,
    onGridSizeChanged: () => {
      this.gridOptions.api.sizeColumnsToFit();
    }
  };
  tableData$ = this.timelineReportService.TimelineTable$;
  totalData$ = this.timelineReportService.TimelineTotal$;
  chartData$ = this.timelineReportService.TimelineChart$;

  ngOnInit() {
  }

  refresh() {
    this.timelineReportService.GetTimelineData()
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'reportTimeline.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

}
