import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SetTabAndRefresh, TrackTicket, RxTicketData } from '../backend/';
import { ITab } from '../shared';

const ticketTabs: ITab[] = [{
    tag: 'wait',
    title: 'GIAO DỊCH ĐỢI VƯỢT CHUẨN'
}, {
    subtitles: ['Thời điểm phục vụ', 'Thời điểm kết thúc', 'Thời gian phục vụ'],
    tag: 'serve',
    title: 'GIAO DỊCH PHỤC VỤ VƯỢT CHUẨN',
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
        data.filter(v=>v.state!='cancelled');
        if (this.waitLong) {
            data.sort((a, b) => {
                if (a.s_at == b.s_at) {
                    return a.c_at < b.c_at ? -1 : 1;
                }
                return a.s_at < b.s_at ? -1 : 1;
            });
        } else {
            data.sort((a, b) => {
                if (a.f_at == b.f_at) {
                    return a.s_at < b.s_at ? -1 : 1;
                }
                return a.f_at < b.f_at ? -1 : 1;
            })
        }
        return data;
    });

    setActive(tab: ITab) {
        this.waitLong = tab.tag === 'wait';
        SetTabAndRefresh(tab);
    }
}