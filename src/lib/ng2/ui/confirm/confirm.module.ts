import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfirmDialog, ConfirmDirective } from './confirm.directive';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { 
    NoticeComponent, NoticeMessageComonent, NoticeDialogComponent
 } from './notice.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule, MatButtonModule,
        FlexLayoutModule, CommonModule
    ],
    declarations: [
        AppConfirmDialog, ConfirmDirective,
        NoticeComponent, NoticeMessageComonent, NoticeDialogComponent
    ],
    entryComponents: [
        AppConfirmDialog, NoticeMessageComonent, NoticeDialogComponent
    ],
    exports: [
        ConfirmDirective,
        NoticeComponent, NoticeMessageComonent
    ],
    // providers: [
    //     { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
    // ]
})
export class ConfirmModule { }
