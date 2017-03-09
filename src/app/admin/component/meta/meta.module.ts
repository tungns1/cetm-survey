import { NgModule } from '@angular/core';
import { SharedModule, Model } from '../../shared/';
import { Editor, Form } from '../shared/';
import { routing, components } from './meta.routing';

@NgModule({
    imports: [
        SharedModule, 
        Editor.EditorModule, Form.UIFormModule, Form.CultureModule,
        routing
    ],
    declarations: [...components]
})
export class MetaModule {

}