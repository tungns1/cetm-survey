import { NgModule } from '@angular/core';
import { SharedModule, Branch } from '../../shared/';
import { Editor } from '../shared';
import { routing, components } from './org.routing';

@NgModule({
    imports: [
        SharedModule, Editor.EditorModule, Branch.BranchModule, routing
    ],
    declarations: [...components]
})
export class OrgModule {

}