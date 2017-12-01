import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdminFormModule, FlexLayoutModule, MultiFilePickerModule } from '../../shared';
import { SliderFormComponent } from './slider-form.component';

@NgModule({
  imports: [
    FormsModule, CommonModule, AdminFormModule,
    MultiFilePickerModule, FlexLayoutModule
  ],
  declarations: [SliderFormComponent],
  exports: [SliderFormComponent]
})
export class SliderFormModule { }
