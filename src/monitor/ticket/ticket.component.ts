import { Component, OnInit } from '@angular/core';
import { socket } from './backend';

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent implements OnInit {
    ngOnInit() {
        socket.Connect({});
    }

    ngOnDestroy() {
        socket.Terminate();
    }

}