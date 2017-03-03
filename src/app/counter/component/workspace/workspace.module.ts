import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { CounterComponent } from './workspace.component';
import { workspaceServiceProvider } from './service';
import { InfoCustomerModule } from './info-customer/info.module';

const routing = RouterModule.forChild([
    {
        path: '',
        component: CounterComponent
    }
]);

@NgModule({
    imports: [routing, SharedModule, QueueModule, ServingModule, StatModule,InfoCustomerModule],
    declarations: [CounterComponent],
    providers: [workspaceServiceProvider]
})
export class WorkspaceModule { }