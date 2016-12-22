import { NgModule } from '@angular/core';
import { MonitorDeviceComponent } from './device.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonitorTabModule } from '../shared/';
import { CTimeDatePipe } from './time.pipe';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorDeviceComponent
    }
]);

@NgModule({
    imports: [routing, MonitorTabModule, CommonModule],
    declarations: [MonitorDeviceComponent, CTimeDatePipe]
})
export class MonitorDeviceModule { }