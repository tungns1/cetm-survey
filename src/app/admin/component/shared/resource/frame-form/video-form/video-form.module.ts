import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VideoFormComponent } from './video-form.component';
import { AdminFormModule, MultiFilePickerModule } from '../../shared';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        MultiFilePickerModule
    ],
    declarations: [VideoFormComponent],
    exports: [VideoFormComponent]
})
export class VideoFormModule {

}
