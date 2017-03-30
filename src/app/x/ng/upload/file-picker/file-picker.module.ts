import {
    NgModule, ModuleWithProviders,
    ValueProvider
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileBrowserModule } from '../file-browser/file-browser.module';
import { ModalModule } from '../../modal/';
import { FilePickerComponent } from './file-picker.component';

@NgModule({
    imports: [FormsModule, CommonModule, FileBrowserModule, ModalModule],
    declarations: [FilePickerComponent],
    exports: [FilePickerComponent]
})
export class FilePickerModule {

}

import { MultiFilePickerComponent } from './multi-file-picker.component';
import { UploadURLToken } from '../backend';

@NgModule({
    imports: [FormsModule, CommonModule, FilePickerModule],
    declarations: [MultiFilePickerComponent],
    exports: [FilePickerModule, MultiFilePickerComponent]
})
export class MultiFilePickerModule {
    
}

