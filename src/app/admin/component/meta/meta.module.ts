import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../shared/';
import { routing } from './meta.routing';
import { MetaComponent } from './meta.component';

@NgModule({
    imports: [
        SharedModule,
        EditorModule, AdminFormModule,
        routing
    ],
    declarations: [MetaComponent]
})
export class MetaModule {

}