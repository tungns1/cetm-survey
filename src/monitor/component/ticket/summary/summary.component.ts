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
    }

    ngOnDestroy() {

    }

    printed(s: ISummary) {
        return s.waiting + s.serving + s.missed + s.finished + s.cancelled;
    }

    focus(branch_id: string) {
        this.filterService.SetFocus(branch_id);
        this.navService.SyncLink();
        this.navService.isShowDetail = true;
        this.navService.selectedBranch = branch_id;
    }

    message = '';
    summary$ = this.ticketService.summary$;
    totalSummary$ = this.summary$.map(data =>{
        return Summary.Aggrgate(data);
    });
}