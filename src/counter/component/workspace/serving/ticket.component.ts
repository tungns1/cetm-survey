import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Model } from '../../shared';
import { TimerComopnent } from '../../../../x/ng/time/timer.component';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css'],
})
export class TicketComponent {
    @Input() ticket = null;
}

