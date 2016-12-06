import { SelectCheckModule } from '../../x/ui/select/';
import { NgModule } from '@angular/core';
import { Branch, Editor, L10n } from '../shared/';

import { routing, components } from './house.routing';

@NgModule({
    imports: [
        SelectCheckModule, Branch.BranchModule,
        Editor.EditorModule, L10n.L10nModule, Editor.ArrayFormModule,
        routing
    ],
    declarations: [...components]
})
export class HouseModule {

}