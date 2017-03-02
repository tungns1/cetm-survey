import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ISummary, Summary, MonitorNavService, MonitorFilterService } from '../../shared';
import { MonitorTicketService } from '../ticket.service';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent {
    constructor(
        private navService: MonitorNavService,
        private filterService: MonitorFilterService,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.filterService.ExclusiveSubscribe(filter => {
            let branches: string[] = filter.Branch.GetBranchIDByLevel(0);
            if (branches.length < 1) {
                this.message = "MESSAGE_PLEASE_SELECT_BRANCH";
            }
        });
        this.totalSummary$.subscribe(data => this.total = data);
    }

    ngOnDestroy() {

    }

    focus(selectedBranch) {
        this.filterService.SetFocus(selectedBranch.branch_id);
        this.navService.SyncLink();
    }

    message = '';
    total = new Summary();
    summary$ = this.ticketService.summary$;
    totalSummary$ = this.summary$.map(data =>{
        return Summary.Aggregate(data);
    });
}