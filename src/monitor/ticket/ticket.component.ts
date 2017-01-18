import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SetTabAndRefresh, TrackTicket, RxTicketData } from '../backend/';
import { ITab } from '../shared';

const ticketTabs: ITab[] = [{
    tag: 'wait',
    title: 'TAB_TRANSACTION_WAIT'
}, {
    tag: 'serve',
    title: 'TAB_TRANSACTION_SERVING',
}];

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent {
    ngOnInit() {
        TrackTicket();
        RxTicketData.subscribe(data => console.log(data));
    }

    tabs = ticketTabs;
    waitLong = true;
    rxData = RxTicketData.map(data => {
       let v= data.filter(v=>v.state!='cancelled');
        if (this.waitLong) {
            v.sort((a, b) => {
                if (a.s_at == b.s_at) {
                    return a.c_at < b.c_at ? -1 : 1;
                }
                return a.s_at < b.s_at ? -1 : 1;
            });
        } else {
            v.sort((a, b) => {
                if (a.f_at == b.f_at) {
                    return a.s_at < b.s_at ? -1 : 1;
                }
                return a.f_at < b.f_at ? -1 : 1;
            })
        }
        return v;
    });

    setActive(tab: ITab) {
        this.waitLong = tab.tag === 'wait';
        SetTabAndRefresh(tab);
    }
}