import { NgModule } from '@angular/core';
import { SharedModule, TranslateModule } from '../../../shared';
import { EditorComponent, EditorTitleComponent } from './editor.component';

@NgModule({
    imports: [SharedModule, TranslateModule],
    declarations: [
        EditorComponent, EditorTitleComponent
    ],
    exports: [EditorComponent, EditorTitleComponent]
})
export class EditorModule {

}