import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';
import { FrameFormModule } from './frame-form';

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, FrameFormModule
  ],
  declarations: [ResourceEditorComponent],
  exports: [ResourceEditorComponent]
})
export class ResourceModule { }
