import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { workspaceServiceProvider } from './shared';
import { InfoCustomerModule } from './info-customer/info.module';

const routing = RouterModule.forChild([
    {
        path: '',
        component: WorkspaceComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule, QueueModule, ServingModule, StatModule, InfoCustomerModule],
    declarations: [WorkspaceComponent],
    providers: [workspaceServiceProvider]
})
export class WorkspaceModule { }