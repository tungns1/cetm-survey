import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { TimerComopnent } from '../shared';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class TicketComponent {
    @Input() ticket = null;
}

