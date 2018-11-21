import { Component, OnInit, Input } from '@angular/core';
import { ISPTS, CacheBranch } from '../../shared';
import { StoreAPI } from '../service/store.service';
import { TimeDurationPipe } from '../../../x/ng/time/timeDuration';
import { GridOptions } from 'ag-grid/dist/lib/entities/gridOptions';
import { LocalDayTimePipe } from '../../../x/ng/time/localDayTime';


@Component({
    selector: 'serving-tab',
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.scss']
})

export class WeekComponent {
    constructor(
        private storeAPI: StoreAPI
    ) { }

    protected _data: ISPTS[];
    cellClass: string[] = ['center', 'padding-10'];

    ngOnInit() {
        this.storeAPI.RxServingViewReport.subscribe(v => {
          this._data = v.data;
          this._data.forEach((d, index) => {
            d['no'] = index + 1;
            d['branchCode'] = CacheBranch.GetCodeForID(CacheBranch.GetByID(d.branch_id).parent);
            d['branchName'] = CacheBranch.GetNameForID(CacheBranch.GetByID(d.branch_id).parent);
      
            d['storeCode'] = CacheBranch.GetCodeForID(d.branch_id);
            d['storeName'] = CacheBranch.GetNameForID(d.branch_id);

          });
        })
        var localDayTime = new LocalDayTimePipe;
        var timeDuration = new TimeDurationPipe;
      }
      curentPage: number;
      totalPage: number;
      
    protected gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple'
    };
    export() {
        var params = {
            skipHeader: false,
            allColumns: true,
            suppressQuotes: false,
            fileName: 'weeklyservingtime.csv',
        };
        this.gridOptions.api.exportDataAsCsv(params);
    }
}
