import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ModalModule } from '../../modal/';

import { ItemComponent } from './item.component';
import { FileTreeComponent } from './file-tree.component';
import { FileUploadComponent } from './upload.component';
import { FolderViewComponent } from './folder-view.component';
import { FileBrowserComponent } from './file-browser.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, ModalModule, MatButtonModule, FlexLayoutModule],
    declarations: [
        ItemComponent,
        FileUploadComponent,
        FileTreeComponent,
        FileBrowserComponent,
        FolderViewComponent
    ],
    exports: [FileBrowserComponent, FileUploadComponent, FileTreeComponent],
    entryComponents: [FileBrowserComponent]
})
export class FileBrowserModule {

}
