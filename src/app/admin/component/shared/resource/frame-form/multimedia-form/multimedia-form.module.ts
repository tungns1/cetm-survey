import { FormGroup, FormControl, FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminFormModule, FlexLayoutModule } from '../../shared';
import { MultiFilePickerModule } from '../shared';
import { MultimediaFormComponent } from './multimedia-form.component';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        MultiFilePickerModule, FlexLayoutModule
    ],
    declarations: [MultimediaFormComponent],
    exports: [MultimediaFormComponent]
})
export class MultimediaFormModule {

}