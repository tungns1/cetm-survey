import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';
import { ImageFormComponent } from './image-form.component';
import { AdminFormModule, FlexLayoutModule, MultiFilePickerModule } from '../../shared';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        MultiFilePickerModule, FlexLayoutModule, ColorPickerModule
    ],
    declarations: [ImageFormComponent],
    exports: [ImageFormComponent]
})
export class ImageFormModule {

}
