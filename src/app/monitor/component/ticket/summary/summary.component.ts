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
    
    wl_percent: Summary;

    summary$ = this.summaryService.summary$;
    totalSummary$ = this.summary$.map(data => {
        this.wl_percent = new Summary();
        return Summary.Aggregate(data);
    });

    
}