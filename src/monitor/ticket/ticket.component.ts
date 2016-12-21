import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tab } from '../tab/';
import { TicketTrack, TicketTracks } from '../backend/';
import { Branch } from '../shared/';

const ticketTabs = [{
    name: ['Thời điểm lấy vé', 'Thời điểm gọi vào', 'Thời gian đợi'],
    tag: 'wait',
    title: 'GIAO DỊCH ĐỢI VƯỢT CHUẨN'
}, {
    name: ['Thời điểm phục vụ', 'Thời điểm kết thúc', 'Thời gian phục vụ'],
    tag: 'serve',
    title: 'GIAO DỊCH PHỤC VỤ VƯỢT CHUẨN',
}]

@Component({
    selector: 'monitor-ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['ticket.component.css']
})
export class MonitorTicketComponent {
    level0 = Branch.SelectedBranchIDLevel0;
    thoigian = 'Thời gian đợi';
    thoidiem = 'Thời điểm lấy vé';
    done = 'Thời điểm gọi vào'
    tag = 'wait';
    tabs = ticketTabs;

    rxData: Observable<TicketTrack[]>;

    setActive(tab: Tab) {
        if (tab.tag === 'wait') {
            this.rxData = TicketTracks.WaitLong();
            
        } else {
            this.rxData = TicketTracks.ServeLong();
        }
        this.thoidiem = tab.name[0];
        this.done = tab.name[1];
        this.thoigian = tab.name[2];
        this.tag = tab.tag;
    }
}