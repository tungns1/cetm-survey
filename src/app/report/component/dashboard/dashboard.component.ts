import {
    Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportNavService } from '../../service/';
import { AggregateService } from './shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdTabGroup } from '@angular/material';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
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

    data$ = this.aggregateService.RxAggregate;
    groupBy$ = this.aggregateService.groupBy$;
    summary$ = this.aggregateService.RxSummaryView;
    
    tabChange(e) {
        console.log("tab", e);
    }
}