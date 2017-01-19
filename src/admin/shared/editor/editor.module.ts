import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { I18n } from '../../shared';

import { EditorComponent, EditorTitleComponent } from './editor.component';
import { ModalModule } from '../../../x/ui/modal/';

@NgModule({
    imports: [CommonModule, ModalModule, ReactiveFormsModule,I18n.TranslateModule],
    declarations: [
        EditorComponent, EditorTitleComponent
    ],
    exports: [EditorComponent, EditorTitleComponent, CommonModule, ReactiveFormsModule]
})
export class EditorModule {

}