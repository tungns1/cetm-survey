import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggregateService, ReportFilterService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'customer',
    templateUrl: 'customer.component.html'
})
export class CustomerComponent {
    constructor(
        private aggregateService: AggregateService,
        private filterService: ReportFilterService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.aggregateService.Refresh(filter);
        });
    }
}