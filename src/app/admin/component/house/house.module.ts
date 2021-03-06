import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material'
import {
    AdminFormModule, EditorModule, ServiceListModule,
    SharedModule, BranchModule,
} from '../shared';
import { provideUploadURLToken, MultiFilePickerModule } from '../../shared/upload';

import { HouseComponent } from './house.component';
import { CounterComponent } from './counter/counter.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ScreenComponent } from './screen/screen.component';
import { SFlowComponent } from './sflow/sflow.component';
import { AccordionModule } from '../../../x/ui/accordion/accordion';
import { AdminFilterModule } from "../filter/filter.module";

import { routing } from './house.routing';

import { ResourceModule } from '../shared';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
    imports: [
        SharedModule, BranchModule,
        EditorModule, AdminFormModule, ServiceListModule,
        MultiFilePickerModule, ResourceModule,
        routing, AccordionModule, AdminFilterModule,
        MatCheckboxModule
    ],
    declarations: [
        HouseComponent, CounterComponent, KioskComponent,
        ScreenComponent, SFlowComponent, FeedbackComponent
    ],
    providers: [provideUploadURLToken]
})
export class HouseModule {

}