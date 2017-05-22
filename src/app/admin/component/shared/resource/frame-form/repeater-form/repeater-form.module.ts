import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RepeaterFormComponent } from './repeater-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

@NgModule({
    imports: [FormsModule, CommonModule, AdminFormModule, FlexLayoutModule],
    declarations: [RepeaterFormComponent],
    exports: [RepeaterFormComponent]
})
export class RepeaterFormModule {

}