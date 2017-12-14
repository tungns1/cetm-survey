import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

import { ColorPickerModule } from 'ngx-color-picker';
import { KeyboardFormComponent } from './keyboard-form.component';

@NgModule({
  imports: [
    FormsModule, CommonModule, AdminFormModule,
    FlexLayoutModule, ColorPickerModule, MatFormFieldModule,
    MatInputModule
  ],
  declarations: [KeyboardFormComponent],
  exports: [KeyboardFormComponent]
})
export class KeyboardFormModule { }
