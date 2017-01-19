import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, L10n, Form } from '../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../shared/upload';
import { ServiceListModule } from './shared/';
import { I18n } from '../../shared';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule,I18n.TranslateModule,
        Editor.EditorModule, L10n.L10nModule, Form.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, ServiceListModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}