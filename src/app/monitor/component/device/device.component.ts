import { Component } from '@angular/core';

const tabDevice: any[] = [{
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
    
}
