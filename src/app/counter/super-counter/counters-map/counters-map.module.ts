import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared'

import { CountersMapComponent } from './counters-map.component';
import { CounterCellComponent } from './counter-cell/counter-cell.component';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [CountersMapComponent, CounterCellComponent],
  exports: [CountersMapComponent]
})
export class CountersMapModule { }
