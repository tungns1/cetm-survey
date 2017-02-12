import { NgModule } from '@angular/core';
import { SharedModule, Model } from '../../shared/';
import { Editor, Form } from '../shared/';
import { routing, components } from './meta.routing';
import { SelectCheckModule } from '../shared';

@NgModule({
    imports: [
        SharedModule, SelectCheckModule,
        Editor.EditorModule, Form.UIFormModule, Form.CultureModule,
        routing
    ],
    declarations: [...components]
})
export class MetaModule {

}