import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, L10n } from '../shared/';

import { routing, components } from './house.routing';
import { FilePickerModule, MultiFilePickerModule } from '../shared/upload';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule,
        Editor.EditorModule, L10n.L10nModule, Editor.ArrayFormModule,
        FilePickerModule, MultiFilePickerModule, routing
    ],
    declarations: [...components]
})
export class HouseModule {

}