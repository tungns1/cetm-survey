import { Component, OnInit, Input } from '@angular/core';
import { CounterAPI, paging } from '../service/counter.service';
import { ICounterTrack, CacheBranch } from '../../shared';
import { GridOptions } from "ag-grid";
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { LocalDayTimePipe } from '../../../x/ng/time/localDayTime';

@Component({
  selector: 'activity-tab',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  constructor(
    private counterAPI: CounterAPI
  ) { }

  paging = paging;
  protected _data: ICounterTrack[];
  cellClass: string[] = ['center', 'pad']


  ngOnInit() {
    var localDayTime = new LocalDayTimePipe;
    var timeDuration = new TimeDurationPipe;
    this.paging.data$.subscribe(d => {
      this._data = d;
      this._data.forEach((d, index) => {
        d['no'] = index + 1;
        d['branchCode'] = CacheBranch.GetCodeForID(CacheBranch.GetByID(d.bid).parent);
        d['branchName'] = CacheBranch.GetNameForID(CacheBranch.GetByID(d.bid).parent);

        d['storeCode'] = CacheBranch.GetCodeForID(d.bid);
        d['storeName'] = CacheBranch.GetNameForID(d.bid);

        d['loginTime'] = localDayTime.transform(d.s_at.toString());
        d['logoutTime'] = localDayTime.transform(d.e_at.toString());
        d['totalConnectionTime'] = timeDuration.transform(d.a_d);
      });
    })
  }

  curentPage: number = 1;
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
      fileName: 'counterActivity.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
  }

  // pagin(page: number) {
  //   this.counterAPI.pagin(page);
  // }

}
