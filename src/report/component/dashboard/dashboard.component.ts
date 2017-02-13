import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AggregateService, ReportFilterService } from '../../service/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    constructor(
        private aggregateService: AggregateService,
        private filterService: ReportFilterService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.filterService.SetLink("/dashboard");
        this.filterService.Refresh();
    }
}