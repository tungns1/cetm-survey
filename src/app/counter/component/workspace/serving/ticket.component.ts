import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { TimerComopnent } from '../../../../x/ng/time/timer.component';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class TicketComponent {
    @Input() ticket = null;
}

