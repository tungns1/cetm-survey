import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { CusWaitingService } from './shared/cus-waiting.service';
import { ICusWaitingSum } from './shared/cus-waiting.model';
import { BranchNamePipe } from '../../shared/pipe/branch.pipe';

@Component({
  selector: 'app-cus-waiting',
  templateUrl: './cus-waiting.component.html',
  styleUrls: ['./cus-waiting.component.scss']
})
export class CusWaitingComponent implements OnInit {

  constructor(
    private cusWatingService: CusWaitingService
  ) { }

  tableData$ = this.cusWatingService.CustomerWaiting$.map(data => {
    if (data) {
      let result = data.TableData;
      result.forEach(record => {
        const branchNamePipe = new BranchNamePipe();
        record['store'] = branchNamePipe.transform(record.branch_id);
      })
      return result;
    }
  });
  sumData: ICusWaitingSum = null;
  chartData = [];


  cellClass: string[] = ['center', 'padding-10'];

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  ngOnInit() {
    this.cusWatingService.CustomerWaiting$.subscribe(data => {
      if (data) {
        this.sumData = data.SumData;
        this.chartData = data.ChartData;
      }
    });
  }

  refresh() {
    this.cusWatingService.Refresh()
  }

  noCellRenderer(d) {
    return d.rowIndex + 1;
  }

}
