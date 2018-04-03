import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { CusWaitingService } from './shared/cus-waiting.service';

@Component({
  selector: 'app-cus-waiting',
  templateUrl: './cus-waiting.component.html',
  styleUrls: ['./cus-waiting.component.scss']
})
export class CusWaitingComponent implements OnInit {

  constructor(
    private cusWatingService: CusWaitingService
  ) { }

  tableData$ = this.cusWatingService.tableData$;


  cellClass: string[] = ['center', 'padding-10'];

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
  }

  refresh() {
    this.cusWatingService.Refresh()
  }

  noCellRenderer(d) {
    return d.rowIndex + 1;
  }

}
