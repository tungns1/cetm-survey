import { NgModule, Injectable } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatProgressBarModule, MatTabsModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { SharedModule, AppStorage, HttpServiceGenerator, HttpApi } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { MiniModeFormModule } from './setting/minimode-form.module';
import { WelcomeModule } from '../welcome/welcome.module';
import { ActionModule } from './action/action.module';
import { CustomerModule } from './customer/customer.module';

import { WorkspaceSettingService, IBranchConfig } from './shared';
import { SessionValidationGuard, RuntimeEnvironment, AuthService } from '../shared/shared'

import { WorkspaceComponent } from './workspace/workspace.component';
import { NormalWorkspaceComponent } from './workspace/normal/normal.component';
import { MiniWorkspaceComponent } from './workspace/mini/mini.component';
import { SettingComponent } from './setting/setting.component';
import { workspaceServiceProvider } from './shared/workspace.provider';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { CrudApiServiceGenerator } from '../../admin/service';

/**
 * Check setting before redirect
 */
@Injectable()
export class CounterWorkspaceGuard extends SessionValidationGuard implements CanActivate {
    constructor(
        router: Router,
        authService: AuthService,
        private settingService: WorkspaceSettingService,
        env: RuntimeEnvironment,

    ) {
        super(router, authService, env);
    }
    login = false;
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        this.settingService.checkLogin();
        this.settingService.force_auto_login$.subscribe(v => {
            this.settingService.login_value$.subscribe(v1 => {
                if (v !== null && v1 !== null) {
                    if (v === true) {
                        this.login = v1
                        AppStorage.AutoLogin = v1
                    } else {
                        this.login = AppStorage.AutoLogin
                    }
                }
            })
        })
        if (this.settingService.Check()) {
            return super.canActivate(next, state);
        }
        this.router.navigate(['/counter/welcome'], {
            queryParams: {
                redirect: this.settingService.Check() ? '/counter/workspace/main' : '/counter/workspace/setting',
                setting: '/counter/workspace/setting'
            }
        });
        return false;
    }

    GetAuthExtra() {
        return {
            branch_code: this.settingService.Data.branch_code,
            auto_login:  AppStorage.AutoLogin
        }
    }


    GetScope() {
        return "staff";
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
            CounterWorkspaceGuard,
            // CounterSessionValidationGuard
        ]
    },
    {
        path: 'setting', // /counter/workspace/setting
        component: SettingComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule, QueueModule, HttpClientModule,
        ServingModule, StatModule, MatProgressSpinnerModule,
        MatCheckboxModule, MatInputModule, MatFormFieldModule,
        MatToolbarModule, MatProgressBarModule, MatTabsModule,
        MiniModeFormModule, ActionModule, CustomerModule
    ],
    declarations: [
        WorkspaceComponent, NormalWorkspaceComponent, MiniWorkspaceComponent,
        SettingComponent
    ],
    providers: [workspaceServiceProvider, CounterWorkspaceGuard, CrudApiServiceGenerator]
})
export class WorkspaceModule { }