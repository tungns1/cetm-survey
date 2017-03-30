import { NgModule } from '@angular/core';
import { AdminFormModule, EditorModule, ServiceListModule } from '../shared';
import { SharedModule, BranchModule } from '../../shared/';
import { provideUploadURLToken, MultiFilePickerModule } from '../../shared/upload';

import { HouseComponent } from './house.component';
import { CounterComponent } from './counter/counter.component';
import { KioskComponent } from './kiosk/kiosk.component';
import { ScreenComponent } from './screen/screen.component';
import { SFlowComponent } from './sflow/sflow.component';

import { routing } from './house.routing';

@NgModule({
    imports: [
        SharedModule, BranchModule,
        EditorModule, AdminFormModule, ServiceListModule,
        MultiFilePickerModule,
        routing
    ],
    declarations: [
        HouseComponent, CounterComponent, KioskComponent,
        ScreenComponent, SFlowComponent
    ],
    providers: [provideUploadURLToken]
})
export class HouseModule {

}