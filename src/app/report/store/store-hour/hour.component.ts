import { Component, OnInit, Input } from '@angular/core';
import { StoreAPI } from '../service/store.service';
import { ISH,CacheBranch} from '../../shared';
import { GridOptions } from "ag-grid";
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { LocalDayTimePipe } from '../../../x/ng/time/localDayTime';
import { ShowLoading, HideLoading } from '../../../../lib/backend/loading';

@Component({
  selector: 'hour-tab',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent {
  constructor(
    private storeAPI: StoreAPI
  ) { }

  protected _data: ISH[];


  ngOnInit() {
    this.storeAPI.RxStoreViewByHour.subscribe(v=>{
      console.log(v.data)
      this._data=v.data;
      this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['storeCode'] = CacheBranch.GetCodeForID(d.branch_id);
      d['storeName'] = CacheBranch.GetNameForID(d.branch_id);

      d['avgWaiting'] = localDayTime.transform(d.avg_waiting.toString());
      d['sumWaiting'] = localDayTime.transform(d.sum_waiting.toString());
      d['avgServing'] = localDayTime.transform(d.avg_serving.toString());
      d['sumServing'] = localDayTime.transform(d.sum_serving.toString());
    });
    })
    var localDayTime = new LocalDayTimePipe;
    var timeDuration = new TimeDurationPipe;
  }

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

