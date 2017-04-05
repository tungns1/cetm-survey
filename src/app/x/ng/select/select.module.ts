
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '../../i18n';
import {SelectCheckComponent} from './select_check';
import { DirectiveModule } from '../../../shared/directive/directive.module';

@NgModule({
    imports: [FormsModule, CommonModule, TranslateModule, DirectiveModule],
    declarations: [SelectCheckComponent],
    exports: [SelectCheckComponent, DirectiveModule]
})
export class SelectCheckModule {

}
