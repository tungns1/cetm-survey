import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../'
import { AvgTimeComponent } from './avgTime/avgTime.component'

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [AvgTimeComponent],
  exports: [AvgTimeComponent]
})
export class ComponentSharedModule { }
