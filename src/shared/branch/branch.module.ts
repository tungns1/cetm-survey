import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchSelectorComponent, MultiBranchSelectorComponent } from './branch.component';
import { BranchPickerComponent } from './branch_picker.component';
import { BranchNamePipe, LevelNamePipe } from './branch.pipe';
import { I18n } from '../../shared/';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent, BranchNamePipe, LevelNamePipe,,I18n.TranslateModule],
    declarations: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent, BranchNamePipe, LevelNamePipe],
})
export class BranchModule {

}


