import { NgModule } from '@angular/core';
import { SharedModule, BranchModule } from '../../shared/';
import { EditorModule } from '../shared';
import { routing, components } from './org.routing';

@NgModule({
    imports: [
        SharedModule, EditorModule, BranchModule, routing
    ],
    declarations: [...components]
})
export class OrgModule {

}