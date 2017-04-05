import { NgModule } from '@angular/core';
import { SharedModule, TranslateModule } from '../../../shared';
import { EditorComponent, EditorTitleComponent, EditorFieldComponent } from './editor.component';

import { AppDataTableComponent } from './table.component';

@NgModule({
    imports: [SharedModule, TranslateModule],
    declarations: [
        EditorComponent, EditorTitleComponent, EditorFieldComponent,
        AppDataTableComponent
    ],
    exports: [
        EditorComponent, EditorTitleComponent, EditorFieldComponent,
        AppDataTableComponent
    ]
})
export class EditorModule {

}