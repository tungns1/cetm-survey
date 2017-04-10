import { NgModule } from '@angular/core';
import { SharedModule, Ng2BasicModule } from '../../../shared';
import { EditorComponent, EditorTitleComponent, EditorFieldComponent } from './editor.component';

import { AppDataTableComponent, AppTableFieldComponent } from './table.component';
import { EditorViewComponent } from './editor-view.component';

@NgModule({
    imports: [SharedModule, Ng2BasicModule],
    declarations: [
        EditorComponent, EditorTitleComponent, EditorFieldComponent,
        AppDataTableComponent, AppTableFieldComponent, EditorViewComponent
    ],
    exports: [
        EditorComponent, EditorTitleComponent, EditorFieldComponent,
        AppDataTableComponent, AppTableFieldComponent, EditorViewComponent
    ]
})
export class EditorModule {

}