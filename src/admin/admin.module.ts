import { routing, components } from './admin.routing';
import { NgModule } from '@angular/core';
import { PageModule } from '../pages/';

import { Branch, Editor } from './shared/';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        PageModule, Branch.BranchModule, Editor.EditorModule, routing
    ],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export default class AdminModule {

}

import {SetAppName} from '../config/';
SetAppName('admin');