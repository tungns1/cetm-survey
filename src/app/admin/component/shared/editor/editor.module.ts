import { NgModule } from '@angular/core';
import { Lib, SharedModule,SharedService } from '../../../shared';
import { EditorComponent, EditorTitleComponent } from './editor.component';

@NgModule({
    imports: [Lib.Ng.ModalModule, SharedModule,SharedService.I18n.TranslateModule],
    declarations: [
        EditorComponent, EditorTitleComponent
    ],
    exports: [EditorComponent, EditorTitleComponent]
})
export class EditorModule {

}