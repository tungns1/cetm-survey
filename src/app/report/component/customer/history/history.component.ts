import { Component, OnInit, Input } from '@angular/core';
import { ITransactionView } from '../../../model';
import { ReportFilterService, Paging } from '../../../service/';
import { CustomerAPI, paging } from '../service/customer.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
    selector: 'history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']
})

export class HistoryComponent {
    constructor(
        private filterService: ReportFilterService,
        private customerAPI: CustomerAPI
    ) { }
    @Input() id: string;
    paging = paging;


    ngOnInit() {
        this.customerAPI.pagin(1,'', this.id);
    }
    pagin(page: number) {
        this.customerAPI.RxSummaryView.subscribe(v => {
             this.customerAPI.pagin(page,'', v.customer_id);
        });
       
    }


    excel() {
        this.customerAPI.ExportHistory();
        // return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');
    } 

}

// var data = [
//   {
//     name: "Test 1",
//     age: 13,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 2',
//     age: 11,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
//   {
//     name: 'Test 4',
//     age: 10,
//     average: 8.2,
//     approved: true,
//     description: "using 'Content here, content here' "
//   },
// ];

// new Angular2Csv(data, 'My Report');

// var options = { 
//     fieldSeparator: ',',
//     quoteStrings: '"',
//     decimalseparator: '.',
//     showLabels: true, 
//     showTitle: true 
//   };

//   this.Angular2Csv(data, 'filename', options);
