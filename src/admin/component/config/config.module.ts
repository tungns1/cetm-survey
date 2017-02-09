import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfigComponent } from './config.component';
import { FeedbackConfigModule } from './feedback.module';
import { SharedService, SharedModule, Editor, Form } from '../../shared/';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: ConfigComponent
    }
]);

@NgModule({
    imports: [
        routing, SharedModule,
        Editor.EditorModule, Form.JSONFormModule, FeedbackConfigModule,
        SharedService.I18n.TranslateModule
    ],
    declarations: [ConfigComponent]
})
export class ConfigModule {

}
