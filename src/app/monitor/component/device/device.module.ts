import { NgModule } from '@angular/core';
import { MonitorDeviceComponent } from './device.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CTimeDatePipe } from './time.pipe';
import { SharedModule } from '../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorDeviceComponent
    }
]);

@NgModule({
    imports: [routing, CommonModule, SharedModule],
    declarations: [MonitorDeviceComponent, CTimeDatePipe]
})
export class MonitorDeviceModule { }