import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule, ResourceModule } from '../shared/';
import { routing } from './center.routing';
import { RichEditorModule } from '../../../x/ng/rich-editor/rich-editor.module';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent } from './layout/layout.component';
import { TicketLayoutComponent } from './ticket-layout/ticket-layout.component';
import { CenterComponent } from './center.component'
import { VoiceComponent } from './voice/voice.component';
import { AdminFilterModule } from "../filter/filter.module";

@NgModule({
    imports: [
        SharedModule,
        EditorModule,
        AdminFormModule,
        ResourceModule,
        RichEditorModule,
        routing,AdminFilterModule
    ],
    declarations: [
        CenterComponent, TicketLayoutComponent,
        LayoutComponent, ServiceComponent,
        TFormComponent, VoiceComponent
    ]
})
export class CenterModule {

}