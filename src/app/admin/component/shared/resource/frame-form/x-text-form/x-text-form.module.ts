import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { XTextFormComponent } from './x-text-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

@NgModule({
  imports: [
    FormsModule, CommonModule, AdminFormModule,
    ColorPickerModule, MatFormFieldModule, MatInputModule,
    FlexLayoutModule
  ],
  declarations: [XTextFormComponent],
  exports: [XTextFormComponent]
})
export class XTextFormModule {

}
