import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFormComponent } from './text-form.component';
import { AdminFormModule } from '../../shared';

@NgModule({
    imports: [FormsModule, CommonModule, AdminFormModule],
    declarations: [TextFormComponent],
    exports: [TextFormComponent]
})
export class TextFormModule {

}
