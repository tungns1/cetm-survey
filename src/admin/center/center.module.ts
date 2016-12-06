import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, L10n } from '../shared/';

import { routing, components } from './center.routing';
import { UIFormModule } from '../../model/center/ui/';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule,
        Editor.EditorModule, L10n.L10nModule, UIFormModule,
        routing
    ],
    declarations: [...components]
})
export class CenterModule {

}