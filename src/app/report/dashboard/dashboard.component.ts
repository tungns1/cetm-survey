import {
    Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportNavService } from '../shared';
import { AggregateService } from './shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

    data$ = this.aggregateService.ActiveAggregate$;
    groupBy$ = this.aggregateService.groupBy$;
    summary$ = this.aggregateService.RxSummaryView;
    
    tabChange(e) {
        console.log("tab", e);
    }
}