import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Ticket } from '../model/house/ticket/ticket';

@Component({
    selector: 'ticket-icon',
    template: `
        <img [style.width]="width" class="icon" [src]="src">&nbsp;{{ticketNum}}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketIconComponent {

    srcs = {
        normal: "./assets/img/icon/person.png",
        privileged: "./assets/img/icon/wheelchair.png",
        vip: "./assets/img/icon/star.png"
    }
    src = "";
    @Input() width = "15px";
    @Input() ticket: Ticket;
    private params: any;
    private ticketNum: string;
    
    ngOnInit(){
        if(this.ticket){
            this.setSrc(this.ticket);
        } else if(this.params){
            this.setSrc(this.params.data);
            this.width = this.params.width;
            this.ticketNum = this.params.data.cnum;
        }
    }

    agInit(params: any): void {
        this.params = params;
    }

    setSrc(ticket: Ticket){
        this.src = this.srcs[ticket.priority.code];
    }
}