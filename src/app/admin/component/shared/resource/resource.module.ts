import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule, MatInputModule } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';
import { FrameFormModule } from './frame-form';
import { RawResourcePipe } from './resource-editor/resource-raw.pipe';
import { FlexLayoutModule, AccordionModule, FilePickerModule } from './shared';
import { UIEditorComponent } from './ui-editor/ui-editor.component';
import { UtilPipeModule } from '../../../../shared/pipe';
import { LayoutEditorComponent } from './layout-editor/layout-editor.component';

@NgModule({
  imports: [
    CommonModule, FrameFormModule, FormsModule,
    FlexLayoutModule, MatCheckboxModule, AccordionModule,
    UtilPipeModule, ColorPickerModule, MatInputModule,
    FilePickerModule
  ],
  declarations: [ResourceEditorComponent, RawResourcePipe, UIEditorComponent, LayoutEditorComponent],
  exports: [ResourceEditorComponent],
  entryComponents: [UIEditorComponent, LayoutEditorComponent]
})
export class ResourceModule { }
