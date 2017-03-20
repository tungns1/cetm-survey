import { NgModule } from '@angular/core';
import { SharedModule, TranslateModule } from '../../../shared';
import { EditorComponent, EditorTitleComponent, EditorFieldComponent } from './editor.component';

@NgModule({
    imports: [SharedModule, TranslateModule],
    declarations: [
        EditorComponent, EditorTitleComponent, EditorFieldComponent
    ],
    exports: [EditorComponent, EditorTitleComponent, EditorFieldComponent]
})
export class EditorModule {

}