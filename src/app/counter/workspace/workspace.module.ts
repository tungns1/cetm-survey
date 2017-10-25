import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';
import { SharedModule } from '../shared';
import { QueueModule } from '../shared/component/queue/queue.module'
// import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { NormalWorkspaceComponent } from './workspace/normal/normal.component';
import { MiniWorkspaceComponent } from './workspace/mini/mini.component';
import { workspaceServiceProvider } from './shared/workspace.provider';

const routing = RouterModule.forChild([
    {
        path: '',
        component: WorkspaceComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule, QueueModule,
        ServingModule, StatModule, MatProgressSpinnerModule
    ],
    declarations: [
        WorkspaceComponent, NormalWorkspaceComponent, MiniWorkspaceComponent
    ],
    providers: [workspaceServiceProvider]
})
export class WorkspaceModule { }