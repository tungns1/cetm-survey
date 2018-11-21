import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { IFeedbackDetail } from '../shared/monitor-survey.model';
import { GridOptions } from 'ag-grid';

@Component({
  selector: 'app-poor-feedback-modal',
  templateUrl: './poor-feedback-modal.component.html',
  styleUrls: ['./poor-feedback-modal.component.scss']
})
export class PoorFeedbackModalComponent implements OnInit {

    constructor(
        private router: Router,
        private dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any
    ) { }

    protected data: any;
    private tableData: IFeedbackDetail[] = [];
    private isStoreChannel: boolean = true;
    private gridOptions: GridOptions = {
      rowHeight: 35,
      rowSelection: 'multiple',
    };
    cellclass: string[] = ['padding-10', 'center'];


    ngOnInit() {
        this.data = this.dialogData.data;
        this.isStoreChannel = this.dialogData.isStoreChannel;
        this.data.survey_detail.forEach(detail => {
          this.tableData = this.tableData.concat(detail.feedback_detail)
          .map(rowData => {
            if(rowData.type === 'answer') rowData.point = '---';
            return rowData;
          });
        })
        // console.log(this.data);
    }

    close() {
        this.dialog.closeAll();
    }
}