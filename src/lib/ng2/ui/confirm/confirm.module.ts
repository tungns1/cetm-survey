import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/material';
import { AppConfirmDialog, ConfirmDirective } from './confirm.directive';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [AppConfirmDialog, ConfirmDirective],
    entryComponents: [AppConfirmDialog],
    exports: [ConfirmDirective],
    providers: [
        { provide: OverlayContainer, useClass: FullscreenOverlayContainer }
    ]
})
export class ConfirmModule { }
