import { NgModule } from "@angular/core";
import { Branch, SharedService } from "./shared/";
import { SharedModule } from "./shared/";
import { AppComponent } from "./admin.component";
import { AdminFilterModule } from "./component";
import { routing, components } from "./admin.routing";
import { adminServiceProvider } from "./service";

@NgModule({
    imports: [
        SharedModule, routing, AdminFilterModule
    ],
    providers: [adminServiceProvider],
    declarations: [AppComponent, ...components],
    bootstrap: [AppComponent]
})
export class AdminModule {

}
