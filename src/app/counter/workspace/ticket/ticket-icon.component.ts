import { Component, Input } from '@angular/core';
import { Ticket } from '../shared';

@Component({
    selector: 'ticket-icon',
    template: `
    <span *ngIf="ticket">
        <img *ngIf="ticket.priority_code == 'normal'" src="./assets/img/icon/person.png" alt="Number Ticket">
        <img *ngIf="ticket.priority_code == 'customer'" src="./assets/img/icon/wheelchair.png" alt="Number Ticket">
        <img *ngIf="ticket.priority_code == 'vip'" src="./assets/img/icon/star.png" alt="Number Ticket">
    </span>
    `
})
export class TicketIconComponent {
    @Input() ticket: Ticket;
}