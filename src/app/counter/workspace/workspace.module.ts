import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatProgressBarModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { SharedModule, AppStorage } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { MiniModeFormModule } from './setting/minimode-form.module';
import { ActionModule } from './action/action.module';
import { CustomerModule } from './customer/customer.module';

import { WorkspaceSettingService } from './shared';
import { SessionValidationGuard, RuntimeEnvironment, AuthService } from '../shared/shared'

import { WorkspaceComponent } from './workspace/workspace.component';
import { NormalWorkspaceComponent } from './workspace/normal/normal.component';
import { MiniWorkspaceComponent } from './workspace/mini/mini.component';
import { SettingComponent } from './setting/setting.component';
import { workspaceServiceProvider } from './shared/workspace.provider';
import { CrudApiServiceGenerator } from '../../admin/service';
import { of } from 'rxjs';
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
        // this.settingService.checkLogin()
    }
    login = false;
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {

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
        // return this.settingService.force_auto_login$.pipe(switchMap(v1 => {
        //     return this.settingService.login_value$.pipe(map(v => {
        //         if(v1 === true){
        //             return {
        //                 branch_code: this.settingService.Data.branch_code,
        //                 auto_login: v
        //             }
        //         }else{
        //             return {
        //                 branch_code: this.settingService.Data.branch_code,
        //                 auto_login: AppStorage.AutoLogin
        //             }
        //         }
        //     }))
        // }))

        return of({
            branch_code: this.settingService.Data.branch_code,
            // auto_login:  AppStorage.AutoLogin
            auto_login:  false
        })
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
        MatToolbarModule, MatProgressBarModule,
        MiniModeFormModule, ActionModule, CustomerModule
    ],
    declarations: [
        WorkspaceComponent, NormalWorkspaceComponent, MiniWorkspaceComponent,
        SettingComponent
    ],
    providers: [workspaceServiceProvider, CounterWorkspaceGuard, CrudApiServiceGenerator]
})
export class WorkspaceModule { }