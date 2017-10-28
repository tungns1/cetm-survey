import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SharedModule } from '../shared';
import { ComponentSharedModule } from '../shared/component/componentShared.module';
import { CountersMapModule } from './counters-map/counters-map.module';
import { TicketModule } from '../workspace/ticket/ticket.module';
import {
  SuperCounterSocket, QueueService, SuperCounterService,
  CounterDetailService, CounterListService
} from './service'
// import { QueueModule } from '../workspace/queue/queue.module';
// import { StatModule } from '../workspace/stat/stat.module';
import { SuperCounterComponent } from './super-counter.component';
import { CounterDetailComponent } from './counter-detail/counter-detail.component';
import { SuperCounterActionComponent } from './super-counter-action/super-counter-action.component';
import { QueueComponent } from './queue/queue.component';

const routing = RouterModule.forChild([
  {
    path: '',
    component: SuperCounterComponent
  }
]);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  imports: [
    routing, CommonModule, SharedModule,
    ComponentSharedModule, CountersMapModule, SwiperModule,
    TicketModule,
    // QueueModule,
    // StatModule
  ],
  declarations: [SuperCounterComponent, CounterDetailComponent, SuperCounterActionComponent, QueueComponent],
  providers: [
    SuperCounterSocket, QueueService, SuperCounterService,
    CounterDetailService, CounterListService, 
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }

  ]
})
export class SuperCounterModule { }
