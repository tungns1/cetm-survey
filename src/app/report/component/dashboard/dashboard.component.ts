import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportNavService } from '../../service/';
import { AggregateService } from './shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent {
    constructor(
        private aggregateService: AggregateService,
        private nav: ReportNavService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.nav.Refresh$.ExclusiveSubscribe(_ => {
            this.aggregateService.Refresh()
        });
    }
}