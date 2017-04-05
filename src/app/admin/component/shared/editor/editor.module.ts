import { NgModule } from '@angular/core';
import { SharedModule, TranslateModule } from '../../../shared';
import { EditorComponent, EditorTitleComponent, EditorFieldComponent } from './editor.component';

import { AppDataTableComponent, AppTableFieldComponent } from './table.component';
import { EditorViewComponent } from './editor-view.component';

@NgModule({
    imports: [SharedModule, TranslateModule],
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