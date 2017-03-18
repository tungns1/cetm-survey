import { NgModule } from '@angular/core';
import { AdminFormModule, EditorModule, ServiceListModule } from '../shared';
import { SharedModule, BranchModule } from '../../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../../shared/upload';

@NgModule({
    imports: [
        SharedModule, BranchModule,
        EditorModule, AdminFormModule, ServiceListModule,
        FilePickerModule, MultiFilePickerModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}