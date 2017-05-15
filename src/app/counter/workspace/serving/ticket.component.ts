import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { TimerComopnent, ProjectConfig } from '../shared';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class TicketComponent {
    @Input() ticket = null;
    maxServingMinute = ProjectConfig.service.max_serving_minute;
}

