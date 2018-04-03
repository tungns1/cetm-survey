import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { CusWaitingService } from './shared/cus-waiting.service';
import { ICusWaitingSum } from './shared/cus-waiting.model';

@Component({
  selector: 'app-cus-waiting',
  templateUrl: './cus-waiting.component.html',
  styleUrls: ['./cus-waiting.component.scss']
})
export class CusWaitingComponent implements OnInit {

  constructor(
    private cusWatingService: CusWaitingService
  ) { }

  tableData$ = this.cusWatingService.CustomerWaiting$.map(data => { if (data) return data.TableData });
  sumData: ICusWaitingSum = null;


  cellClass: string[] = ['center', 'padding-10'];

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
    this.cusWatingService.CustomerWaiting$.subscribe(data => {
      if (data) this.sumData = data.SumData;
      console.log(this.sumData)
    })
  }

  refresh() {
    this.cusWatingService.Refresh()
  }

  noCellRenderer(d) {
    return d.rowIndex + 1;
  }

}
