import { routing, components } from './admin.routing';
import { NgModule } from '@angular/core';
import { PageModule } from '../pages/';

import { Branch, Editor, Form } from './shared/';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        PageModule, Branch.BranchModule, 
        Editor.EditorModule, Form.JSONFormModule, routing
    ],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export default class AdminModule {

}

import { SetAppName } from '../config/';
SetAppName('admin');

import {Auth} from './shared/';
Auth.AuthOptions.scope = "admin";
