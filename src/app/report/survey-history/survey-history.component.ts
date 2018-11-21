import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {
  SurveyReportService, IHistoryData,
  BranchFilterService, CacheBranch, SurveyFilterService
} from '../shared';
import { SurveyHistoryModalComponent } from './survey-history-modal/survey-history-modal.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-survey-history',
  templateUrl: './survey-history.component.html',
  styleUrls: ['./survey-history.component.scss']
})
export class SurveyHistoryComponent implements OnInit {

  constructor(
    private surveyDashboardService: SurveyReportService,
    private branchFilterService: BranchFilterService,
    private surveyFilterService: SurveyFilterService,
    private datePipe: DatePipe,
    private mdDialog: MatDialog
  ) { }


  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple',
    pagination: true,
    onCellClicked: (e) => {
      if (e.event.target['localName'] === 'img')
        this.showDetails(e.data);
    }
  };
  cellclass: string[] = ['padding-10', 'center'];
  selectedStore: string[] = [];
  private channel: string[] = [];

  data$ = this.surveyDashboardService.HistoryData$.pipe(map(res => {
    if (res && res.data) {
      return res.data.filter(row => {
        return this.channel.find(_channel => _channel === row.channel)
      }).filter(row => {
        if (this.channel.length === 1 && this.channel[0] === 'store') {
          if (this.surveyFilterService.GetActor() === 'store') { // filter by store
            if (row.store)
              return CacheBranch.GetByLevel(0).filter(branch => this.selectedStore.find(id => id === branch.id))
                .find(store => store.name === row.store) ? true : false;
            else return row;
          }
          if (this.surveyFilterService.GetActor() === 'device') {// filter by device
            return this.surveyFilterService.Data.device_code.find(code => code === row.device)
          }

          if (this.surveyFilterService.GetActor() === 'uname') {// filter by teller
            return this.surveyFilterService.Data.user_id.find(code => code === row.uname)
          }
        } else return true;

      }).map(row => {
        row['servingTime'] = this.datePipe.transform(row.serve_at, 'd/M/yy, h:mm a');
        return row;
      })
    } else return []
  }))

  ngOnInit() {
    this.branchFilterService.level0$.subscribe(branches => this.selectedStore = branches);
  }

  refresh() {
    this.channel = this.surveyFilterService.Data.channel;
    this.surveyDashboardService.GetHistoryData();
  }

  noCellRenderer(d) {
    return d.rowIndex + 1;
  }

  detailCellRenderer(d) {
    if (d.data)
      return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    else return '';
  }

  showDetails(data: IHistoryData) {
    const config = new MatDialogConfig();
    config.width = '850px';
    config.data = data;
    const dialog = this.mdDialog.open(SurveyHistoryModalComponent, config);
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


}
