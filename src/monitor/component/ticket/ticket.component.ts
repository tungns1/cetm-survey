import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../shared';
import { MonitorTicketService } from './ticket.service';

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent implements OnInit {
    constructor(
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.ticketService.onInit();
    }

    ngOnDestroy() {
        this.ticketService.onDestroy();
    }

}