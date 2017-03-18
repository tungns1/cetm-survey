import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../shared/';
import { routing, components } from './center.routing';
import { RichEditorModule } from '../../../x/ng/rich-editor/rich-editor.module';

@NgModule({
    imports: [
        SharedModule,
        EditorModule,
        AdminFormModule,
        RichEditorModule,
        routing
    ],
    declarations: [...components]
})
export class CenterModule {

}