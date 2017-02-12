import { NgModule } from '@angular/core';
import { Editor, Form } from '../shared';
import { SharedModule } from '../../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../../shared/upload';

@NgModule({
    imports: [
        SharedModule, 
        Editor.EditorModule, Form.CultureModule, Form.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, Form.ServiceListModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}