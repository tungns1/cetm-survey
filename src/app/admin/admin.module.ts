import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/";
import { AppComponent } from "./admin.component";
import { AdminComponent, AdminFilterModule } from "./component";
import { routing } from "./admin.routing";
import { adminServiceProvider } from "./service";

@NgModule({
    imports: [
        SharedModule, routing, AdminFilterModule,
        HttpClientModule
    ],
    providers: [adminServiceProvider],
    declarations: [AppComponent, AdminComponent],
    bootstrap: [AppComponent]
})
export class AdminModule {

}
