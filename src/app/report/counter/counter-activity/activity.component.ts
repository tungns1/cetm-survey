import { Component, OnInit, Input } from '@angular/core';
import { CounterAPI, paging } from '../service/counter.service';
import { ICounterTrack, CacheBranch, Paging } from '../../shared';
import { GridOptions } from "ag-grid";
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { LocalDayTimePipe } from '../../../x/ng/time/localDayTime';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';

@Component({
  selector: 'activity-tab',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  constructor(
    private counterAPI: CounterAPI
  ) { }

  protected _data: ICounterTrack[];
  cellClass: string[] = ['center', 'padding-10'];
  paging = new Paging<ICounterTrack>();


  ngOnInit() {
    this.pagin(1);
    var localDayTime = new LocalDayTimePipe;
    var timeDuration = new TimeDurationPipe;
    paging.data$.subscribe(d => {
      this._data = d;
      this._data.forEach((d, index) => {
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
    },
    // enableServerSideSorting: true,
    // rowModelType: 'infinite',
    maxBlocksInCache: 18,
    getRowNodeId: function (item) {
      return item.id;
    }

  };

  setRowData(rowData, totalRow: number = -1, skip: number) {
    rowData.forEach((row, index) => row['order'] = index + skip + 1);
    var dataSource = {
      rowCount: 18,
      getRows: function (params) {
        params.successCallback(rowData, totalRow);
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
  }

  jumpToFirst() {
    if (this.curentPage > 1) {
      this.pagin(1);
      this.curentPage = 1;
    }
  }

  prevPage() {
    if (this.curentPage > 1) {
      this.pagin(this.curentPage - 1);
      this.curentPage -= 1;
    }
  }

  nextPage() {
    if (this.curentPage < this.totalPage) {
      this.pagin(this.curentPage + 1);
      this.curentPage += 1;
    }
  }

  jumpToLast() {
    if (this.curentPage < this.totalPage) {
      this.pagin(this.totalPage);
      this.curentPage = this.totalPage;
    }
  }

  jumpToPage(pageIndex: number) {
    if (pageIndex > 0 && pageIndex <= this.totalPage) {
      this.pagin(pageIndex);
      this.curentPage = pageIndex;
    }
  }

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'counterActivity.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }

  pagin(page: number = 1) {
    ShowLoading();
    const skip = paging.SkipForPage(page);
    const limit = paging.Limit;
    this.counterAPI.GetActivity(skip, limit)
      .subscribe(v => {
        paging.SetPage(page);
        paging.Reset(v.data, v.total);
        this.setRowData(v.data, v.total, skip);
        this.gridOptions.api.setInfiniteRowCount(v.total);
        this.totalPage = Math.ceil(v.total / 18);
        if (this.curentPage > this.totalPage)
          this.curentPage = this.totalPage;
        HideLoading();
      });
  }

}
