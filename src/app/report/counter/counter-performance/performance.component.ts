import { Component, OnInit, Input } from '@angular/core';
import { InfoPerformanceTrack, ICPT, CacheBranch } from '../../shared';
// import { CounterAPI } from '../service/counter.service';
import { GridOptions } from "ag-grid";
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration'

@Component({
  selector: 'performance-tab',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent {
  constructor(
    // private counterAPI: CounterAPI
  ) { }

  protected _data: ICPT[];
  @Input() set data(v: InfoPerformanceTrack) {
    this._data = v.data;
    var timeDurationPipe = new TimeDurationPipe();
    this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['branchCode'] = CacheBranch.GetCodeForID(CacheBranch.GetByID(d.branch_id).parent);
      d['branchName'] = CacheBranch.GetNameForID(CacheBranch.GetByID(d.branch_id).parent);

      d['storeCode'] = CacheBranch.GetCodeForID(d.branch_id);
      d['storeName'] = CacheBranch.GetNameForID(d.branch_id);

      d['timeConection'] = timeDurationPipe.transform(d.total_connection_time);
      d['timeProductivity'] = timeDurationPipe.transform(d.total_productivity_time);
      d['timeIdle'] = timeDurationPipe.transform(d.total_idle_time);
    });
  };
  
  cellClass: string[] = ['center', 'padding-10'];
  curentPage: number;
  totalPage: number;

  private gridOptions: GridOptions = {
    rowHeight: 35,
    pagination: true,
    paginationPageSize: 18,
    suppressPaginationPanel: true,
    rowSelection: 'multiple',
    onRowDataChanged: () => {
      this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1;
      this.totalPage = this.gridOptions.api.paginationGetTotalPages()
    }
  };

  jumpToFirst() {
    this.gridOptions.api.paginationGoToFirstPage();
    this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
  }

  prevPage() {
    this.gridOptions.api.paginationGoToPreviousPage();
    this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
  }

  nextPage() {
    this.gridOptions.api.paginationGoToNextPage();
    this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
  }

  jumpToLast() {
    this.gridOptions.api.paginationGoToLastPage();
    this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
  }

  jumpToPage(pageIndex: number) {
    this.gridOptions.api.paginationGoToPage(pageIndex - 1);
    this.curentPage = this.gridOptions.api.paginationGetCurrentPage() + 1
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'counterPerformance.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }
}
