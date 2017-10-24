import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { SupperCounterComponent } from './supper-counter.component';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [SupperCounterComponent]
})
export class SupperCounterModule { }
