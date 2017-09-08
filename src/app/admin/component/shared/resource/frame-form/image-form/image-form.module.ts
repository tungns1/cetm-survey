import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageFormComponent } from './image-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';
import { MultiFilePickerModule } from '../shared';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        MultiFilePickerModule, FlexLayoutModule
    ],
    declarations: [ImageFormComponent],
    exports: [ImageFormComponent]
})
export class ImageFormModule {

}
