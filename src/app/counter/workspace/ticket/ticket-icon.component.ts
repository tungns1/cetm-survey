import { Component, Input } from '@angular/core';
import { Ticket } from '../shared';

@Component({
    selector: 'ticket-icon',
    template: `
        <img [style.width]="width" class="icon" *ngIf="src" [src]="src">
    `
})
export class TicketIconComponent {
    @Input() width = "15px";
    @Input() set ticket(t: Ticket) {
        this.src = t ? this.srcs[t.priority_code] : "";
    }
    srcs = {
        normal: "./assets/img/icon/person.png",
        customer: "./assets/img/icon/wheelchair.png",
        vip: "./assets/img/icon/star.png"
    }
    src = "";
}