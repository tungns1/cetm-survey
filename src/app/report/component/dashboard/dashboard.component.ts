import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggregateService, ReportFilterService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
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