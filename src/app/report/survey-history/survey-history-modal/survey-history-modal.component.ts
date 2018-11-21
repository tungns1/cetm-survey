import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GridOptions } from 'ag-grid';
import { IHistoryData,IFeedbackDetail } from '../../shared';

@Component({
  selector: 'app-survey-history-modal',
  templateUrl: './survey-history-modal.component.html',
  styleUrls: ['./survey-history-modal.component.scss']
})
export class SurveyHistoryModalComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: IHistoryData,
    public dialogRef: MatDialogRef<any>
  ) { }

  surveyData: IHistoryData;
  tableData: IFeedbackDetail[] = [];
  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple',
  };
  cellclass: string[] = ['padding-10', 'center'];

  ngOnInit() {
    this.surveyData = this.dialogData;
    this.surveyData.survey_detail.forEach(detail => {
      this.tableData = this.tableData.concat(detail.feedback_detail).map(rowData => {
        if(rowData.type === 'answer') rowData.point = '---';
        return rowData;
      });
    })
    // console.log(this.dialogData)
    // console.log(this.tableData)
  }

  // close() {
  //   this.dialogRef.close();
  // }
}