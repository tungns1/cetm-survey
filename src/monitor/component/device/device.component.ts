import { Component } from '@angular/core';
import { TrackDevice, RxDeviceData, SetTabAndRefresh } from '../backend/';
import { ITab } from '../shared/';

const tabDevice: ITab[] = [{
    tag: 'branch',
    title: 'SERVER',
    titleTable: 'SERVER_TABLE'
}, {
    tag: 'kiosk',
    title: 'KIOSK',
    titleTable: 'KIOSK_TABLE'
}, {
    tag: 'counter',
    title: 'COUNTER',
    titleTable: 'COUNTER_TABLE'

}, {
    tag: 'screen',
    title: 'SCREEN',
    titleTable: 'SCREEN_TABLE'
}, {
    tag: 'led',
    title: 'LED',
    titleTable: 'LED_TABLE'
}, {
    tag: 'feedback',
    title: 'FEEDBACK',
    titleTable: 'FEEDBACK_TABLE'
}]

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html',
    styleUrls: ['device.component.css']
})
export class MonitorDeviceComponent {
    ngOnInit() {
        TrackDevice();
    }
    rxData = RxDeviceData.map(data => {
        return data.sort((a, b) => a.off_at < b.off_at ? -1 : 1);
    });
    tabs = tabDevice;
    tag = 'branch';
    setActive(tab: ITab) {
        this.tag = tab.tag;
        SetTabAndRefresh(tab);
    }
}
