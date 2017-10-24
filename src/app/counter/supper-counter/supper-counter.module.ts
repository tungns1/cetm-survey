import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
// import { QueueModule } from '../workspace/queue/queue.module';
// import { StatModule } from '../workspace/stat/stat.module';
import { SupperCounterComponent } from './supper-counter.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, 
    // QueueModule,
    // StatModule
  ],
  declarations: [SupperCounterComponent]
})
export class SupperCounterModule { }
