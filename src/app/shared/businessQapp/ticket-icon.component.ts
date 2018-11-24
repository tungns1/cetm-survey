import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Ticket } from '../model/house/ticket/ticket';

@Component({
    selector: 'ticket-icon',
    template: `
    <div style="position: relative;display:inline-block">
        <img class="bookingTicketIcon" *ngIf="bookingTicket" src="./assets/img/icon/bookingOnlineIcon.png">
        <img [style.width]="width" class="icon" [src]="src">&nbsp;{{ticketNum}}
    <div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketIconComponent {

    srcs = {
        normal: "./assets/img/icon/person.png",
        privileged: "./assets/img/icon/wheelchair.png",
        vip: "./assets/img/icon/star.png",
    }
    src = "";
    _ticket: Ticket;
    @Input() width = "15px";
    @Input() set ticket(t: Ticket){
        this._ticket = t
    };
    private params: any;
    ticketNum: string;
    bookingTicket = false;
    ngOnInit(){
        if(this._ticket){
            if(this._ticket.ticket_booking && this._ticket.ticket_booking.id !==''){
                this.bookingTicket = true;
            }
            this.setSrc(this._ticket);
        } else if(this.params){
            this.setSrc(this.params.data);
            this.width = this.params.width;
            this.ticketNum = this.params.data.cnum;
        }
        
    }

    agInit(params: any): void {// get data from ag-grid
        this.params = params;
    }

    setSrc(ticket: Ticket){
        this.src = this.srcs[ticket.priority.code];
    }
}