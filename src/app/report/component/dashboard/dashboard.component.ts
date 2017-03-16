import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            this.aggregateService.Refresh(filter);
        });
    }
    nav(href: string){
        const queryParams = this.route.root.snapshot.queryParams;
        this.router.navigate([href], {
            queryParams: queryParams
        });
    }
}