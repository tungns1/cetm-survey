import { NgModule } from '@angular/core';
import { Lib, SharedModule } from '../../shared';
import { EditorComponent, EditorTitleComponent } from './editor.component';

@NgModule({
    imports: [Lib.Ng.ModalModule, SharedModule],
    declarations: [
        EditorComponent, EditorTitleComponent
    ],
    exports: [EditorComponent, EditorTitleComponent]
})
export class EditorModule {

}