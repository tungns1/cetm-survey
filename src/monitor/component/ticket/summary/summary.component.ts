import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Branch } from '../../../shared';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Summary } from '../../../model';
import { MonitorTicketService } from '../ticket.service';

@Component({
    selector: 'ticket-summary',
    templateUrl: 'summary.component.html'
})
export class SummaryComponent {
    constructor(
        private route: ActivatedRoute,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.data = this.ticketService.Summary;
        this.route.params.subscribe(p => {
            console.log(p);
            let branches: string[] = p['branches'].split(",");
            if (branches.length == 1) {
                if (branches[0].trim() === 'all') {
                    branches = Branch.SelectedBranchIDLevel0.value.split(",");
                }
            }

            branches = branches.filter(id => id.length > 2);

            if (branches.length < 1) {
                this.message = "MESSAGE_PLEASE_SELECT_BRANCH";
                return;
            }

            this.ticketService.observeSummaryOnBranch(branches);
        });
    }

    ngOnDestroy() {
        this.ticketService.observeSummaryOnBranch([]);
    }

    data: Observable<Summary[]>;
    message = '';
}