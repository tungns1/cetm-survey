import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceTracks, DeviceTrack } from '../backend/';
import { Tab } from '../tab/';

const tabDevice: Tab[] = [{
    name: 'Server',
    tag: 'branch',
    title: 'SERVER'
}, {
    name: 'Kiosk',
    tag: 'kiosk',
    title: 'KIOSK',
}, {
    name: 'Quầy',
    tag: 'counter',
    title: 'QUẦY'
}, {
    name: 'Màn hình trung tâm',
    tag: 'screen',
    title: 'MÀN HÌNH TRUNG TÂM'
}, {
    name: 'Led',
    tag: 'led',
    title: 'LED'
}, {
    name: 'Phản hồi',
    tag: 'feedback',
    title: 'PHẢN HỒI'
}]

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html',
    styleUrls: ['device.component.css']
})
export class MonitorDeviceComponent {
    rxData: Observable<DeviceTrack[]>;
    tabs = tabDevice;
    tag='branch';
    setActive(tab: Tab) {
        this.tag=tab.tag;
        this.rxData = DeviceTracks.ByTag(tab.tag);
        this.rxData.subscribe(data => console.log(data));
    }
}
