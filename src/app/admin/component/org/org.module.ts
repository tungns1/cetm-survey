import { NgModule } from '@angular/core';
import { SharedModule, BranchModule } from '../../shared/';
import { EditorModule } from '../shared';
import { provideUploadURLToken } from '../shared/resource/frame-form';
import { AdminFilterModule } from "../filter/filter.module";
import { MultiFilePickerModule } from '../shared/resource/frame-form';
import { routing } from './org.routing';

import { BranchComponent } from './branch/branch.component';
import { UserComponent } from './user/user.component';
import { OrgComponent } from './org.component';


@NgModule({
    imports: [
        SharedModule, EditorModule, BranchModule,
        routing, AdminFilterModule, MultiFilePickerModule
    ],
    declarations: [
        OrgComponent, BranchComponent, UserComponent
    ],
    providers: [provideUploadURLToken]
})
export class OrgModule {

}