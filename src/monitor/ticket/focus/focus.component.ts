import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { Backend } from '../../shared';
import { MonitorTicketService } from '../ticket.service';
import { ISummary, ITicket, Summary } from '../../model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'focus-on-branch',
    templateUrl: 'focus.component.html'
})
export class FocusComponent {
    constructor(
        private router: ActivatedRoute,
        private socket: Backend.AppSocket,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.waiting = this.ticketService.Waiting;
        const branch_id = this.router.snapshot.params['branch_id'];
        this.focus = this.ticketService.Focus;
        this.ticketService.observeSummaryOnBranch(branch_id);
    }

    ngOnDestroy() {
        this.ticketService.Unfocus();
    }

    waiting: Observable<ITicket[]>;
    called: Observable<ITicket[]>;
    focus: Observable<Summary>;
}