import { Component } from '@angular/core';
import { TrackDevice, RxDeviceData, SetTabAndRefresh } from '../backend/';
import { ITab } from '../shared/';

const tabDevice: ITab[] = [{
    tag: 'branch',
    title: 'SERVER'
}, {
    tag: 'kiosk',
    title: 'KIOSK',
}, {
    tag: 'counter',
    title: 'QUẦY'
}, {
    tag: 'screen',
    title: 'MÀN HÌNH TRUNG TÂM'
}, {
    tag: 'led',
    title: 'LED'
}, {
    tag: 'feedback',
    title: 'PHẢN HỒI'
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
    rxData = RxDeviceData;
    tabs = tabDevice;
    tag = 'branch';
    setActive(tab: ITab) {
        this.tag = tab.tag;
        SetTabAndRefresh(tab);
    }
}
