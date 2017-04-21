import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { workspaceServiceProvider, workspaceDeviceProvider } from './shared';
import { InfoCustomerModule } from './info-customer/info.module';
import { WorkspaceGuard } from './shared';
import { NormalWorkspaceComponent } from './workspace/normal/normal.component';
import { MiniWorkspaceComponent } from './workspace/mini/mini.component';

const routing = RouterModule.forChild([
    {
        path: '',
        canActivate: [WorkspaceGuard],
        component: WorkspaceComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule, QueueModule, ServingModule, StatModule, InfoCustomerModule
    ],
    declarations: [
        WorkspaceComponent, NormalWorkspaceComponent, MiniWorkspaceComponent
    ],
    providers: [workspaceServiceProvider, workspaceDeviceProvider]
})
export class WorkspaceModule { }