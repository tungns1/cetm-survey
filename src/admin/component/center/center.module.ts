import { NgModule } from '@angular/core';
import { SharedModule, Model, Editor, Form } from '../../shared/';
import { routing, components } from './center.routing';
import { SelectCheckModule } from '../shared';

@NgModule({
    imports: [
        SharedModule, SelectCheckModule,
        Editor.EditorModule, Form.UIFormModule, Form.CultureModule,
        routing
    ],
    declarations: [...components]
})
export class CenterModule {

}