import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MonitorDeviceComponent } from './device.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';
import { D3Module } from '../../../x/ng/d3/d3.module';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorDeviceComponent
    }
]);

import { MonitorDeviceService } from './device.service';

@NgModule({
    imports: [
        routing, SharedModule, D3Module
    ],
    providers: [
        MonitorDeviceService
    ],
    declarations: [
        MonitorDeviceComponent, FocusComponent, 
        SummaryComponent]
})
export class MonitorDeviceModule { }