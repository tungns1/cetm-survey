import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {
  MatCheckboxModule, MatInputModule, MatFormFieldModule,
  MatToolbarModule, MatProgressBarModule, MatTabsModule,
  // MatListModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SharedModule } from '../shared';
import { SessionValidationGuard, AuthService, RuntimeEnvironment } from '../shared/shared'
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

/**
 * Check setting before redirect
 */
@Injectable()
export class SuperCounterGuard extends SessionValidationGuard implements CanActivate {
  constructor(
    router: Router,
    authService: AuthService,
    private settingService: SuperCounterSettingService,
    env: RuntimeEnvironment
  ) {
    super(router, authService, env);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.settingService.Check()) {

      return super.canActivate(next, state);
    }
    this.router.navigate(['/counter/welcome'], {
      queryParams: {
        redirect: this.settingService.Check() ? '/counter/super/main' : '/counter/super/setting',
        setting: '/counter/super/setting'
      }
    });
    return false;
  }

  GetAuthExtra() {
    return {
      branch_code: this.settingService.Data.branch_code,
      auto_login: true
    }
  }

  GetScope() {
    return "staff";
  }

}


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

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  threshold: 25,
  nextButton: true,
  prevButton: true
};

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
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    SuperCounterGuard
  ]
})
export class SuperCounterModule { }
