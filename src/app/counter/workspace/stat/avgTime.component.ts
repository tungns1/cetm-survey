import { Component, Input } from '@angular/core';
import { ITicket, TicketService } from '../shared';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'average-time',
    templateUrl: 'avgTime.component.html',
    styleUrls: ['sta.component.scss']
})
export class AvgTimeComponent {
    constructor(
        private ticketService: TicketService
    ) { }
    @Input() stime:number;
}