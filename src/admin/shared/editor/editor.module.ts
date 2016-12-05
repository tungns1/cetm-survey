import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorComponent, EditorTitleComponent } from './editor.component';
import { ModalComponent, ModalHeaderComponent, ModalFooterComponent } from './modal.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    declarations: [
        EditorComponent, EditorTitleComponent, 
        ModalComponent, ModalHeaderComponent, ModalFooterComponent
    ],
    exports: [EditorComponent, EditorTitleComponent, CommonModule, ReactiveFormsModule]
})
export class EditorModule {

}