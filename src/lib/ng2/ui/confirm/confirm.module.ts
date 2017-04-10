import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppConfirmDialog, ConfirmDirective } from './confirm.directive';
import { MaterialModule } from '@angular/material';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/material';

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
