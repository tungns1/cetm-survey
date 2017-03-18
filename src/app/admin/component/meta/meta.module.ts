import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../shared/';
import { routing, components } from './meta.routing';

@NgModule({
    imports: [
        SharedModule, 
        EditorModule, AdminFormModule,
        routing
    ],
    declarations: [...components]
})
export class MetaModule {

}