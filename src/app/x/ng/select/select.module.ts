
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '../../i18n';
import { SelectCheckComponent } from './select_check';

@NgModule({
    imports: [FormsModule, CommonModule, TranslateModule],
    declarations: [SelectCheckComponent],
    exports: [SelectCheckComponent]
})
export class SelectCheckModule {

}
