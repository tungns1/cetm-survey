import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { MonitorTicketService } from '../ticket.service';
import { ISummary, ITicket, Summary } from '../../../model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html'
})
export class FocusComponent {
    constructor(
        private router: ActivatedRoute,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.waiting = this.ticketService.Waiting;
        this.focus = this.ticketService.Focus.map(f => [].concat(f));
        this.router.params.subscribe(params => {
            const branch_id = params['branch_id'];
            this.ticketService.FocusOnBranch(branch_id);
        });
    }

    ngOnDestroy() {
        this.ticketService.Unfocus();
    }

    waiting: Observable<ITicket[]>;
    called: Observable<ITicket[]>;
    focus: Observable<Summary[]>;
}