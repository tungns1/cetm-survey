import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ISummary, Summary,
    MonitorNavService, MonitorFilterService
} from '../../shared';
import { MonitorSummaryService, ProjectConfig } from '../shared';

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
        private summaryService: MonitorSummaryService,
      
    ) { }

    ngOnInit() {
        this.waitLongAlertPercent = ProjectConfig.service.wait_long_alert_percent;
        this.serveLongAlertPercent = ProjectConfig.service.serve_long_alert_percent;
        this.navService.Refresh$.ExclusiveSubscribe(_ => {
            this.summaryService.Branches$.next(
                this.filterService.GetStores()
            );
        });
    }

    waitLongAlertPercent: number;
    serveLongAlertPercent: number;

    focus(s: ISummary) {
        this.router.navigate(['../focus', s.branch_id], {
            relativeTo: this.route,
            queryParamsHandling: "merge"
        });
    }

    records$ = this.summaryService.summaries$.map(s => s.ToArray()).share();
    total$ = this.summaryService.summaries$.switchMap(s => s.Total$);
}