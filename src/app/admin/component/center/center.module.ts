import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
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
import { ServiceGroupComponent } from './service-group/service-group.component';

@NgModule({
    imports: [
        SharedModule,
        EditorModule,
        AdminFormModule,
        ResourceModule,
        RichEditorModule,
        routing, AdminFilterModule, AccordionModule,
        MatDialogModule
    ],
    declarations: [
        CenterComponent, TicketLayoutComponent,
        LayoutComponent, ServiceComponent,
        TFormComponent, VoiceComponent,
        XListComponent, ServiceGroupComponent,
        FormConfigComponent,
        FormUserComponent
    ],
    entryComponents: [XListComponent]
})
export class CenterModule {

}