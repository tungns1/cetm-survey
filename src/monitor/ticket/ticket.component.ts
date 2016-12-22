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
    rxData = RxTicketData;

    setActive(tab: ITab) {
        SetTabAndRefresh(tab);
        this.waitLong = tab.tag === 'wait';
        this.headers = tab.subtitles;
    }
}