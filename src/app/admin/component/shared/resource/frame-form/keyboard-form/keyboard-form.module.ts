import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardFormComponent } from './keyboard-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [KeyboardFormComponent],
  exports: [KeyboardFormComponent]
})
export class KeyboardFormModule { }
