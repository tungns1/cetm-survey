import { routing, components } from './admin.routing';
import { NgModule } from '@angular/core';
import { PageModule } from '../pages/';

import { Branch, Editor } from './shared/';
import { AppComponent } from './app.component';
import { CenterModule } from './center/';

@NgModule({
    imports: [
        PageModule, Branch.BranchModule, Editor.EditorModule, routing,
        CenterModule
    ],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export default class AdminModule {

}