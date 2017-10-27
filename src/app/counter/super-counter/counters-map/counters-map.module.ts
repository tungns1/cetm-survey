import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared'

import { CountersMapComponent } from './counters-map.component';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [CountersMapComponent],
  exports: [CountersMapComponent]
})
export class CountersMapModule { }
