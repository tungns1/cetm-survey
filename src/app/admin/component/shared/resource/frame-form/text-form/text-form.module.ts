import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';

import { TextFormComponent } from './text-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

@NgModule({
    imports: [
        FormsModule, CommonModule, AdminFormModule,
        FlexLayoutModule, ColorPickerModule, MatFormFieldModule,
        MatInputModule
    ],
    declarations: [TextFormComponent],
    exports: [TextFormComponent]
})
export class TextFormModule {

}
