import { NgModule } from '@angular/core';
import { SharedModule, Model } from '../../shared/';
import { Editor, Form } from '../shared/';
import { routing, components } from './center.routing';
import { RichEditorModule } from '../../../x/ng/rich-editor/rich-editor.module';

@NgModule({
    imports: [
        SharedModule,
        Editor.EditorModule,
        Form.UIFormModule,
        Form.CultureModule,
        RichEditorModule,
        routing
    ],
    declarations: [...components]
})
export class CenterModule {

}