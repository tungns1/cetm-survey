import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared'

import { CounterDetailComponent } from './counter-detail.component';
import { SuperCounterActionComponent } from './super-counter-action/super-counter-action.component';

@NgModule({
  imports: [
    CommonModule, SharedModule
  ],
  declarations: [CounterDetailComponent, SuperCounterActionComponent],
  exports: [CounterDetailComponent]
})
export class CountersDetailModule { }
