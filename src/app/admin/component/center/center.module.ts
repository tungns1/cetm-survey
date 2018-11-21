import { NgModule } from '@angular/core';
import { MatDialogModule, MatSlideToggleModule, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule, ResourceModule } from '../shared/';
import { routing } from './center.routing';
import { RichEditorModule } from '../../../x/ng/rich-editor/rich-editor.module';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent, XListComponent } from './layout/layout.component';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { CenterComponent } from './center.component'
import { VoiceComponent } from './voice/voice.component';
import { AdminFilterModule } from "../filter/filter.module";
import { AccordionModule } from "../../../x/ui/accordion/accordion";
import { FormConfigComponent } from './form-config/form-config.component';
import { FormUserComponent } from './form-user/form-user.component';
import { SettingPreviewModalComponent, SurveyComponent } from './survey/survey.component';
import { PreviewModalComponent } from './survey/previewModal.component';
import { LinkChannelComponent } from './link-channel/link-channel.component';
import { SurveySettingComponent } from './survey-setting/survey-setting.component';
import { EmailConfigComponent } from './survey-setting/email-config/email-config.component';
import { FeedbackUiconfigComponent } from './survey-setting/feedback-uiconfig/feedback-uiconfig.component';
import { PointConfigComponent } from './survey-setting/point-config/point-config.component';
import { LuckyNumberComponent } from './survey-setting/lucky-number/lucky-number.component';
import { ServiceGroupComponent } from './service-group/service-group.component';

@NgModule({
    imports: [
        HttpClientModule, 
        MatSlideToggleModule,
        MatTabsModule,
        SharedModule,
        EditorModule,
        AdminFormModule,
        ResourceModule,
        RichEditorModule,
        routing, 
        AdminFilterModule, 
        AccordionModule,
        MatDialogModule
    ],
    declarations: [
        LinkChannelComponent,
        SurveyComponent, SurveySettingComponent,
        PreviewModalComponent, SettingPreviewModalComponent,
        EmailConfigComponent, FeedbackUiconfigComponent, PointConfigComponent,
        CenterComponent, TicketLayoutComponent,
        LayoutComponent, ServiceComponent,
        TFormComponent, VoiceComponent,
        XListComponent,
        FormConfigComponent,
        FormUserComponent,
        LuckyNumberComponent,ServiceGroupComponent
    ],
    entryComponents: [
        XListComponent, PreviewModalComponent, SettingPreviewModalComponent],
})
export class CenterModule {

}