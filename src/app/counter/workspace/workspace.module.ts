import { NgModule, Injectable } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatProgressBarModule, MatTabsModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { SharedModule, CounterSessionValidationGuard } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { MiniModeFormModule } from './setting/minimode-form.module';
import { WelcomeModule } from '../welcome/welcome.module';

import { CounterSettingService } from '../shared/counter-setting.service'

import { WorkspaceComponent } from './workspace/workspace.component';
import { NormalWorkspaceComponent } from './workspace/normal/normal.component';
import { MiniWorkspaceComponent } from './workspace/mini/mini.component';
import { SettingComponent } from './setting/setting.component';
import { workspaceServiceProvider } from './shared/workspace.provider';

/**
 * Check setting before redirect
 */
@Injectable()
export class CounterSettingGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingService: CounterSettingService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.settingService.Check()) {
        return true;
      }
      this.router.navigate(['/counter/welcome'], {
        queryParams: {
          redirect: '/counter/workspace/main',
          setting: '/counter/workspace/setting'
        }
      });
      return false;
  }

}

// export function loadWelcome() {
//   return WelcomeModule;
// }

const routing = RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'main'
    },
    {
        path: 'main', // /counter/workspace/main
        component: WorkspaceComponent,
        canActivate: [
            CounterSettingGuard,
            CounterSessionValidationGuard
        ]
    },
    {
        path: 'setting', // /counter/workspace/setting
        component: SettingComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule, QueueModule,
        ServingModule, StatModule, MatProgressSpinnerModule,
        MatCheckboxModule, MatInputModule, MatFormFieldModule,
        MatToolbarModule, MatProgressBarModule, MatTabsModule,
        MiniModeFormModule
    ],
    declarations: [
        WorkspaceComponent, NormalWorkspaceComponent, MiniWorkspaceComponent,
        SettingComponent
    ],
    providers: [workspaceServiceProvider, CounterSettingGuard]
})
export class WorkspaceModule { }