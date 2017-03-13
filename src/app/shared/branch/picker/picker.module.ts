import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BranchFilterModule} from '../filter';
import {BranchPickerComponent} from './picker.component';

@NgModule({
    imports: [FormsModule, CommonModule, BranchFilterModule],
    declarations: [BranchPickerComponent],
    exports: [BranchPickerComponent]
})
export class BranchPickerModule {

}
