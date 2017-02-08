import { NgModule } from '@angular/core';
import { SelectCheckModule } from '../shared';
import { Branch, Editor, Form, SharedModule } from '../../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../../shared/upload';
import { ServiceListModule } from './shared/';

@NgModule({
    imports: [
        SharedModule, SelectCheckModule,
        Editor.EditorModule, Form.CultureModule, Form.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, ServiceListModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}