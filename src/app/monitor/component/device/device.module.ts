import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { MonitorDeviceComponent } from './device.component';
import { SharedModule } from '../../shared';
import { FocusComponent } from './focus/focus.component';
import { SummaryComponent } from './summary/summary.component';

const routing = RouterModule.forChild([
    {
        path: '',
        component: MonitorDeviceComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'summary_device' },
            { path: 'summary_device', component: SummaryComponent },
            { path: 'focus/:branch_id', component: FocusComponent }
        ]
    }
]);


import { monitorServiceProviders } from './shared';
import { CategoryComponent } from './category/category.component';

@NgModule({
    imports: [
        routing, SharedModule, MatProgressSpinnerModule
    ],
    providers: [
        monitorServiceProviders
    ],
    declarations: [
        MonitorDeviceComponent, FocusComponent, 
        SummaryComponent, CategoryComponent]
})
export class MonitorDeviceModule { }