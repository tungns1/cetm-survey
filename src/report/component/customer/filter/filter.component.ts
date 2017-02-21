import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Aggregate, AggregateService } from '../../shared/';

@Component({
    selector: 'report-filter',
    templateUrl: 'filter.component.html'
})
export class ReportFilterComponent {
    constructor(
        private aggregateService: AggregateService
    ) { }

    data: Aggregate;

    ngOnInit() {
        this.aggregateService.RxSummaryView.subscribe(v => {
            this.data = v;
            console.log(v);
        })
    }

    ngOnDestroy() {

    }
    Search(value:string){
        
    }


}