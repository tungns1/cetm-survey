import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from './quill-editor/quill-editor.component';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [QuillEditorComponent],
  exports: [QuillEditorComponent]
})
export class RichEditorModule { }
