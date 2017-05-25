import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCheckbox, MdCheckboxModule } from '@angular/material';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';
import { FrameFormModule } from './frame-form';
import { RawResourcePipe } from './resource-editor/resource-raw.pipe';
import { FlexLayoutModule } from './shared'

@NgModule({
  imports: [
    CommonModule, FrameFormModule, FormsModule, FlexLayoutModule, MdCheckboxModule
  ],
  declarations: [ResourceEditorComponent, RawResourcePipe],
  exports: [ResourceEditorComponent]
})
export class ResourceModule { }
