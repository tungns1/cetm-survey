import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../../shared';
import { FilterService } from '../../service';
import { MonitorTicketService } from './ticket.service';

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent implements OnInit {
    constructor(
        private filterService: FilterService,
        private ticketService: MonitorTicketService
    ) { }

    ngOnInit() {
        this.filterService.SummaryMode();
        this.ticketService.onInit();
    }

    ngOnDestroy() {
        this.ticketService.onDestroy();
    }

}