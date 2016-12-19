import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DeviceTracks, DeviceTrack } from '../backend/';
import { Tab } from '../tab/';

const tabDevice: Tab[] = [{
    name: 'Server',
    tag: 'branch',
    title: 'SERVER'
}, {
    name: 'Màn hình kiosk',
    tag: 'kiosk',
    title: 'MÀN HÌNH KIOSK',
}, {
    name: 'Quầy',
    tag: 'counter',
    title: 'COUNTER'
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
    title: 'FEEDBACK'
}]

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html',
    styleUrls: ['device.component.css']
})
export class MonitorDeviceComponent {
    rxData: Observable<DeviceTrack[]>;
    tabs = tabDevice;

    setActive(tab: Tab) {
        this.rxData = DeviceTracks.ByTag(tab.tag);
        this.rxData.subscribe(data => console.log(data));
    }
}
