import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregateService, ReportNavService } from '../../service/';
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
        this.nav.Refresh$.subscribe(_ => {
            this.aggregateService.Refresh()
        });
    }
}