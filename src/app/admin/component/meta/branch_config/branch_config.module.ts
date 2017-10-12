import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material'
import { BranchModule, SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../../shared';
import { BranchConfigComponent } from './branch_config.component';
import { FeedbackConfigModule } from './feedback.module';
import { ServiceConfigModule } from './service.module';
import { PriorityConfigModule } from './priority.module';
import { CounterConfigModule } from './counter.module';

export const routing = RouterModule.forChild([
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: ':id',
        component: BranchConfigComponent
    }
]);

@NgModule({
    imports: [
        routing, BranchModule, SharedModule,
        EditorModule, AdminFormModule,
        FeedbackConfigModule, ServiceConfigModule, 
        PriorityConfigModule, CounterConfigModule,
        MatTabsModule
    ],
    declarations: [BranchConfigComponent]
})
export class BranchConfigModule {

}
