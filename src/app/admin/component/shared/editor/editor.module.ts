import { NgModule } from '@angular/core';
import { SharedModule, Ng2BasicModule } from '../../../shared';

import { AppDataTableComponent, AppTableFieldComponent } from './table.component';
import { EditorViewComponent } from './editor-view.component';

@NgModule({
    imports: [SharedModule, Ng2BasicModule],
    declarations: [
        AppDataTableComponent, AppTableFieldComponent, EditorViewComponent
    ],
    exports: [
        AppDataTableComponent, AppTableFieldComponent, EditorViewComponent
    ]
})
export class EditorModule {

}