import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfirmDialog, ConfirmDirective } from './confirm.directive';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/material';

import { 
    NoticeComponent, NoticeMessageComonent, NoticeDialogComponent
 } from './notice.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
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
    providers: [
        { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
    ]
})
export class ConfirmModule { }
