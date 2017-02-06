import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, I18n } from '../shared/';

import { routing, components } from './center.routing';
import { UIFormModule } from '../../model/center/ui/';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule,
        Editor.EditorModule, I18n.CultureModule, UIFormModule, routing, I18n.TranslateModule,
        routing
    ],
    declarations: [...components]
})
export class CenterModule {

}