import { NgModule } from '@angular/core';
import { Editor, Form } from '../shared';
import { SharedModule, Branch } from '../../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../../shared/upload';

@NgModule({
    imports: [
        SharedModule, Branch.BranchModule,
        Editor.EditorModule, Form.CultureModule, Form.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, Form.ServiceListModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}