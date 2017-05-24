import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/';
import { EditorModule, AdminFormModule } from '../shared/';
import { routing } from './meta.routing';
import { MetaComponent } from './meta.component';
import { AdminFilterModule } from "../filter/filter.module";

@NgModule({
    imports: [
        SharedModule,
        EditorModule, AdminFormModule,
        routing, AdminFilterModule
    ],
    declarations: [MetaComponent]
})
export class MetaModule {

}