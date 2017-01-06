import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConfigComponent } from './config.component';
import { Editor, Form } from '../shared';
import { FeedbackConfigModule } from './feedback.module';

export const routing = RouterModule.forChild([
    {
        path: '',
        component: ConfigComponent
    }
]);

@NgModule({
    imports: [routing, Editor.EditorModule, Form.JSONFormModule, FeedbackConfigModule],
    declarations: [ConfigComponent]
})
export class ConfigModule {

}
