import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BranchConfigComponent } from './branch_config.component';
import { FeedbackConfigModule } from './feedback.module';
import { SharedService, SharedModule } from '../../shared/';
import { Editor, Form } from '../../shared';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: BranchConfigComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule,
        Editor.EditorModule, Form.JSONFormModule, FeedbackConfigModule,
        SharedService.I18n.TranslateModule
    ],
    declarations: [BranchConfigComponent]
})
export class BranchConfigModule {

}
