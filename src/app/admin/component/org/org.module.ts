import { NgModule } from '@angular/core';
import { SharedModule, BranchModule } from '../../shared/';
import { EditorModule } from '../shared';
import { routing } from './org.routing';

import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';
import { OrgComponent } from './org.component';
import { AdminFilterModule } from "../filter/filter.module";


@NgModule({
    imports: [
        SharedModule, EditorModule, BranchModule, routing,AdminFilterModule
    ],
    declarations: [
        OrgComponent, BranchComponent, UserComponent
    ]
})
export class OrgModule {

}