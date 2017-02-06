import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, I18n, Form } from '../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../shared/upload';
import { ServiceListModule } from './shared/';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule, I18n.TranslateModule,
        Editor.EditorModule, I18n.CultureModule, Form.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, ServiceListModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}