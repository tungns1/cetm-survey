import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchSelectorComponent, MultiBranchSelectorComponent } from './branch.component';
import { BranchPickerComponent } from './branch_picker.component';
import { I18n } from '../shared';
import { UtilPipeModule } from '../pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule,
        UtilPipeModule, I18n.TranslateModule
    ],
    exports: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent],
    declarations: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent],
})
export class BranchModule {

}


