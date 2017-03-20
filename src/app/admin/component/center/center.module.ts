import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../shared/';
import { routing } from './center.routing';
import { RichEditorModule } from '../../../x/ng/rich-editor/rich-editor.module';
import { ServiceComponent } from './service/service.component';
import { TFormComponent } from './tform/tform.component';
import { LayoutComponent } from './layout/layout.component';
import { CenterComponent } from './center.component'
import { VoiceComponent } from './voice/voice.component';

@NgModule({
    imports: [
        SharedModule,
        EditorModule,
        AdminFormModule,
        RichEditorModule,
        routing
    ],
    declarations: [
        CenterComponent, 
        LayoutComponent, ServiceComponent, 
        TFormComponent, VoiceComponent
    ]
})
export class CenterModule {

}