import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { LuckyUserReportService } from '../shared/service/lucky-user-report.service';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
    selector: 'app-lucky-user',
    templateUrl: './lucky-user.component.html',
    styleUrls: ['./lucky-user.component.scss']
})
export class LuckyUserComponent implements OnInit {

    constructor(
        private luckyUserServices: LuckyUserReportService
    ) { }

    ngOnInit() {

    }

    data$ = this.luckyUserServices.luckyUser$;

    cellclass: string[] = ['padding-10', 'center'];

    private gridOptions: GridOptions = {
        rowHeight: 35,
        rowSelection: 'multiple',
        pagination: false,
        onGridSizeChanged: () => {
            this.gridOptions.api.sizeColumnsToFit();
        }
    };

    refresh() {
        this.luckyUserServices.GetLuckyUsersData()
    }

    export() {
        var params = {
          skipHeader: false,
          allColumns: true,
          suppressQuotes: false,
          fileName: 'reportLuckyUsers.csv',
        };
        console.log(this.gridOptions.api.getDataAsCsv(params));
        this.gridOptions.api.exportDataAsCsv(params);
      }
}
