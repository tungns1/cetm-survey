import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';
import { I18nFormComponent } from './i18n-form.component';
import { AdminFormModule, FlexLayoutModule, MultiFilePickerModule } from '../../shared';

@NgModule({
  imports: [
    FormsModule, CommonModule, AdminFormModule,
    MultiFilePickerModule, FlexLayoutModule, ColorPickerModule
  ],
  declarations: [I18nFormComponent],
  exports: [I18nFormComponent]
})
export class I18nFormModule { }
