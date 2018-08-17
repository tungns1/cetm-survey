import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [ActionComponent],
  exports: [ActionComponent]
})
export class ActionModule { }