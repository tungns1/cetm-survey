import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ModalFooterComponent, ModalHeaderComponent } from './modal.component';

let components = [ModalComponent, ModalFooterComponent, ModalHeaderComponent]

@NgModule({
    imports: [CommonModule],
    declarations: [...components],
    exports: [...components]
})
export class ModalModule { }