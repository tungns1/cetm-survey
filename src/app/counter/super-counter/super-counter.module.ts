import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { ComponentSharedModule } from '../shared/component/componentShared.module'
import { CountersMapModule } from './counters-map/counters-map.module'
// import { QueueModule } from '../workspace/queue/queue.module';
// import { StatModule } from '../workspace/stat/stat.module';
import { SuperCounterComponent } from './super-counter.component';
import { CounterDetailComponent } from './counter-detail/counter-detail.component';
import { SuperCounterActionComponent } from './super-counter-action/super-counter-action.component';

@NgModule({
  imports: [
    CommonModule, SharedModule,
    ComponentSharedModule, CountersMapModule
    // QueueModule,
    // StatModule
  ],
  declarations: [SuperCounterComponent, CounterDetailComponent, SuperCounterActionComponent]
})
export class SuperCounterModule { }
