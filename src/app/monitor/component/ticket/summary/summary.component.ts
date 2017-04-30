import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ISummary, Summary,
    MonitorNavService, MonitorFilterService
} from '../../shared';
import { MonitorSummaryService } from '../shared';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private summaryService: MonitorSummaryService
    ) { }

    ngOnInit() {
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            this.summaryService.Branches$.next(
                this.filterService.GetStores()
            );
        });
    }

    focus(s: ISummary) {
        this.router.navigate(['../focus', s.branch_id], {
            relativeTo: this.route,
            queryParamsHandling: "merge"
        });
    }

    loading$ = this.summaryService.summaries$.filter(s => !s);
    records$ = this.summaryService.summaries$.map(s => s.ToArray()).share();
    total$ = this.summaryService.summaries$.switchMap(s => s.Total$);
}