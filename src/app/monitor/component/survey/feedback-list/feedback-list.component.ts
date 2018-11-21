import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { GridOptions } from 'ag-grid';
import { IFeedbackReport } from '../shared/monitor-survey.model';
import { PoorFeedbackModalComponent } from '../poor-feedback-modal/poor-feedback-modal.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  constructor(
    private mdDialog: MatDialog,
  ) { }

  @Input() data: BehaviorSubject<IFeedbackReport[]>;
  cellclass: string[] = ['padding-10', 'center'];
  private gridOptions: GridOptions = {
    rowHeight: 35,
    onCellClicked: (e) => {
      if (e.event.target['localName'] === 'img')
        this.showDetailPoorFeedback(e.data);
    },
    onGridSizeChanged: () => {
        this.gridOptions.api.sizeColumnsToFit();
    }
  };

  ngOnInit() {
  }

  detailCellRenderer(d) {
    if (d.data)
      return '<img class="iconDetail" src="./assets/img/icon/play.png" style="cursor: pointer">';
    else return '';
  }

  showDetailPoorFeedback(data: IFeedbackReport) {
    const config = new MatDialogConfig();
    config.width = '700px';
    config.data = {data: data, isStoreChannel: true};
    const dialog = this.mdDialog.open(PoorFeedbackModalComponent, config);
  }

}
