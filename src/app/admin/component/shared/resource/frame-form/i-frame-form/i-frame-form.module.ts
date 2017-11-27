import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFrameFormComponent } from './i-frame-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

@NgModule({
  imports: [
    FormsModule, CommonModule, AdminFormModule,
    FlexLayoutModule
  ],
  declarations: [IFrameFormComponent],
  exports: [IFrameFormComponent]
})
export class IFrameFormModule { }