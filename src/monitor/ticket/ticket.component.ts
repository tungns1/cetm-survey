import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tab } from '../tab/';
import { TicketTrack, TicketTracks } from '../backend/';

const ticketTabs = [{
    name: ['Thời điểm lấy vé', 'Thời gian đợi'],
    tag: 'wait',
    title: 'GIAO DỊCH ĐỢI VƯỢT CHUẨN'
}, {
    name: ['Thời điểm phục vụ', 'Thời gian phục vụ'],
    tag: 'serve',
    title: 'GIAO DỊCH PHỤC VỤ VƯỢT CHUẨN',
}]

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent {
    thoigian = 'Thời gian đợi';
    thoidiem = 'Thời điểm lấy vé';
    tag='wait';
    tabs = ticketTabs;

    rxData: Observable<TicketTrack[]>;

    setActive(tab: Tab) {
        this.rxData = TicketTracks.ByTag(tab.tag).map(tracks => {
            console.log(tracks);
            if (tab.tag === 'wait') {
                tracks.sort((a, b) => a.c_at > b.c_at ? 1 : 0);
            } else {
                tracks.sort((a, b) => a.s_at > b.s_at ? 1 : 0);
            }
            return tracks;
        });
        this.rxData.subscribe(data => console.log(data));
        this.thoidiem = tab.name[0];
        this.thoigian = tab.name[1];
        this.tag=tab.tag;
    }
}