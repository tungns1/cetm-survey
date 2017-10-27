import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { ComponentSharedModule } from '../shared/component/componentShared.module';
import { CountersMapModule } from './counters-map/counters-map.module';
import { 
  SuperCounterSocket, QueueService, SuperCounterService, 
  CounterDetailService, CounterListService 
} from './service'
// import { QueueModule } from '../workspace/queue/queue.module';
// import { StatModule } from '../workspace/stat/stat.module';
import { SuperCounterComponent } from './super-counter.component';
import { CounterDetailComponent } from './counter-detail/counter-detail.component';
import { SuperCounterActionComponent } from './super-counter-action/super-counter-action.component';

const routing = RouterModule.forChild([
  {
      path: '',
      component: SuperCounterComponent
  }
]);

@NgModule({
  imports: [
    routing, CommonModule, SharedModule,
    ComponentSharedModule, CountersMapModule
    // QueueModule,
    // StatModule
  ],
  declarations: [SuperCounterComponent, CounterDetailComponent, SuperCounterActionComponent],
  providers: [
    SuperCounterSocket, QueueService, SuperCounterService, 
    CounterDetailService, CounterListService
  ]
})
export class SuperCounterModule { }
