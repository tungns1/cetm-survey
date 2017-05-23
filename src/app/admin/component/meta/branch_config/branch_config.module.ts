import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../../shared';
import { BranchConfigComponent } from './branch_config.component';
import { FeedbackConfigModule } from './feedback.module';
import { ServiceConfigModule } from './service.module';

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
        routing, SharedModule,
        EditorModule, AdminFormModule,
        FeedbackConfigModule,
        ServiceConfigModule
    ],
    declarations: [BranchConfigComponent]
})
export class BranchConfigModule {

}
