import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { Model } from '../../shared';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css'],
})
export class TicketComponent {
    @Input() ticket = null;
}

