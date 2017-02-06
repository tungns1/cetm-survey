import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfigComponent } from './config.component';
import { Editor, Form } from '../shared';
import { FeedbackConfigModule } from './feedback.module';
import { I18n } from '../shared/';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: ConfigComponent
    }
]);

@NgModule({
    imports: [routing, Editor.EditorModule, Form.JSONFormModule, FeedbackConfigModule,I18n.TranslateModule],
    declarations: [ConfigComponent]
})
export class ConfigModule {

}
