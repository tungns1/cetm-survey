import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorComponent, EditorTitleComponent } from './editor.component';
import { ModalModule } from '../../../x/ui/modal/';

@NgModule({
    imports: [CommonModule, ModalModule, ReactiveFormsModule],
    declarations: [
        EditorComponent, EditorTitleComponent
    ],
    exports: [EditorComponent, EditorTitleComponent, CommonModule, ReactiveFormsModule]
})
export class EditorModule {

}