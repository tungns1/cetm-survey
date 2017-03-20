import { Component } from '@angular/core';

const tabDevice: any[] = [{
    tag: 'branch',
    title: 'Server',
    titleTable: 'Server'
}, {
    tag: 'kiosk',
    title: 'Kiosk',
    titleTable: 'Kiosk'
}, {
    tag: 'counter',
    title: 'Counter',
    titleTable: 'Counter'

}, {
    tag: 'screen',
    title: 'Screen Center',
    titleTable: 'Screen Center'
}, {
    tag: 'led',
    title: 'Led',
    titleTable: 'Led'
}, {
    tag: 'feedback',
    title: 'Feedback',
    titleTable: 'Feedback'
}]

@Component({
    selector: 'monitor-device',
    templateUrl: 'device.component.html',
    styleUrls: ['device.component.css']
})
export class MonitorDeviceComponent {
    
}
