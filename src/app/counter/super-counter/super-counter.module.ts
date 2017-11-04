import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {
  MatCheckboxModule, MatInputModule, MatFormFieldModule,
  MatToolbarModule, MatProgressBarModule, MatTabsModule,
  // MatListModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from '../shared';
import { ComponentSharedModule } from '../shared/component/componentShared.module';
import { CountersMapModule } from './counters-map/counters-map.module';
import { TicketModule } from '../workspace/ticket/ticket.module';
import { WelcomeModule } from '../welcome/welcome.module';
import { SuperCounterComponent } from './super-counter.component';
import { CounterDetailComponent } from './counter-detail/counter-detail.component';
import { SuperCounterActionComponent } from './super-counter-action/super-counter-action.component';
import { QueueComponent } from './queue/queue.component';
import { SuperCounterSettingComponent } from './super-counter-setting/super-counter-setting.component';
import { SecurityPassComponent } from './security-pass/security-pass.component';
import { SuperCounterProvider } from './shared/super-counter-provider';
import { SuperCounterSettingService } from './shared';
import { SuperCounterGuard } from './shared/super-counter.guard';

const routing = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'main',
    component: SuperCounterComponent,
    canActivate: [
      SuperCounterGuard
    ]
  },
  {
    path: 'setting',
    component: SuperCounterSettingComponent
  }
]);

@NgModule({
  imports: [
    routing, CommonModule, SharedModule,
    ComponentSharedModule, CountersMapModule, SwiperModule,
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatProgressBarModule, MatTabsModule,
    TicketModule, WelcomeModule
  ],
  declarations: [
    SuperCounterComponent, CounterDetailComponent, SuperCounterActionComponent,
    QueueComponent, SuperCounterSettingComponent, SecurityPassComponent
  ],
  providers: [
    SuperCounterProvider,
    SuperCounterGuard
  ]
})
export class SuperCounterModule { }
