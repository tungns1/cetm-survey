import { Component, Input } from '@angular/core';
import { Ticket } from '../../shared';

@Component({
    selector: "app-incomplete-ticket",
    templateUrl: "incomplete.html"
})
export class IncompleteTicketComponent {
    @Input() data: Ticket[];
}
