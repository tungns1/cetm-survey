import { Component, OnInit, Input } from '@angular/core';
import { InfoStore, ISPT, CacheBranch } from '../../shared';
import { StoreAPI } from '../service/store.service';
import { GridOptions } from "ag-grid";
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { LocalDayTimePipe } from '../../../x/ng/time/localDayTime';

@Component({
  selector: 'performance-tab',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent {
  constructor(
    private storeAPI: StoreAPI
  ) { }

  protected _data: ISPT[];
  cellClass: string[] = ['center', 'padding-10'];
  @Input() set data(v: InfoStore) {
    this._data = v.data;
    var timeDurationPipe = new TimeDurationPipe();
    this._data.forEach((d, index) => {
      d['no'] = index + 1;
      d['branchCode'] = CacheBranch.GetCodeForID(CacheBranch.GetByID(d.branch_id).parent);
      d['branchName'] = CacheBranch.GetNameForID(CacheBranch.GetByID(d.branch_id).parent);

      d['storeCode'] = CacheBranch.GetCodeForID(d.branch_id);
      d['storeName'] = CacheBranch.GetNameForID(d.branch_id);
    });
  };

  private gridOptions: GridOptions = {
    rowHeight: 35,
    rowSelection: 'multiple'
  };

  export() {
    var params = {
      skipHeader: false,
      allColumns: true,
      suppressQuotes: false,
      fileName: 'storePerformance.csv',
    };
    console.log(this.gridOptions.api.getDataAsCsv(params));
    this.gridOptions.api.exportDataAsCsv(params);
  }
}
