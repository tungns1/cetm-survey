import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {
    MatCheckboxModule, MatInputModule, MatFormFieldModule,
    MatToolbarModule, MatProgressBarModule, MatTabsModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { SharedModule } from '../shared';
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

@Injectable()
class workspaceConfig implements Resolve<any> {
    constructor(private settingService: CounterSettingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        let result = {
            ok: this.settingService.Check(),
            setting: '../setting',
            redirect: this.settingService.Check() ? '../main' : '../setting'
        }
        return result;
    }
}

export function loadWelcome() {
  return WelcomeModule;
}

const routing = RouterModule.forChild([
    {
        path: '',
        resolve: {
            super: workspaceConfig
        },
        runGuardsAndResolvers: 'always',
        loadChildren: loadWelcome,
    },
    {
        path: 'main', // /counter/workspace/main
        component: WorkspaceComponent
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
    providers: [workspaceServiceProvider, workspaceConfig]
})
export class WorkspaceModule { }