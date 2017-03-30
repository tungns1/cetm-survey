import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormModule } from './text-form/text-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { ModalModule, AdminFormModule } from '../shared';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    ModalModule,
    AdminFormModule, TextFormModule
  ],
  declarations: [GenericFormComponent],
  exports: [GenericFormComponent]
})
export class FrameFormModule { }
