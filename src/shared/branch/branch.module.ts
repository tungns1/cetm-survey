import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchSelectorComponent, MultiBranchSelectorComponent } from './branch.component';
import { BranchPickerComponent } from './branch_picker.component';
import { BranchNamePipe, LevelNamePipe } from './branch.pipe';
import { TranslateModule } from '../i18n';

@NgModule({
    imports: [CommonModule, FormsModule,TranslateModule],
    exports: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent, BranchNamePipe, LevelNamePipe],
    declarations: [BranchSelectorComponent, BranchPickerComponent, MultiBranchSelectorComponent, BranchNamePipe, LevelNamePipe],
})
export class BranchModule {

}


