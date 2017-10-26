import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountersMapComponent } from './counters-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CountersMapComponent],
  exports: [CountersMapComponent]
})
export class CountersMapModule { }
