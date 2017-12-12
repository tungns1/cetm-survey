import { FormGroup, FormControl } from '@angular/forms';
import { NgModule, forwardRef, ExistingProvider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RepeaterFormComponent, I18nModalComponent } from './repeater-form.component';
import { AdminFormModule, FlexLayoutModule } from '../../shared';

@NgModule({
    imports: [FormsModule, CommonModule, AdminFormModule, FlexLayoutModule],
    declarations: [RepeaterFormComponent, I18nModalComponent],
    exports: [RepeaterFormComponent],
    entryComponents: [I18nModalComponent]
})
export class RepeaterFormModule {

}