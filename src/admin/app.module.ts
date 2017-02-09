import { NgModule } from '@angular/core';
import { Branch, SharedService } from './shared/';
import { NewBaseAppModule } from './shared/';
import { AppComponent } from './app.component';
import { routing, components } from './app.routing';
import { Editor, Form } from './shared/';
import { adminServiceProvider } from './service';

const appName = "admin";

@NgModule({
    imports: [
        NewBaseAppModule(appName), routing,
        Editor.EditorModule, Form.JSONFormModule
    ],
    providers: [adminServiceProvider],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export class AppModule {

}

SharedService.Auth.AuthOptions.scope = "admin";
