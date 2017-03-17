import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule, SharedService } from "./shared/";
import { AppComponent } from "./counter.component";
import { routing } from "./counter.routing";
import { CounterComponent } from "./component";
import { counterServiceProvider } from "./service";

@NgModule({
    imports: [
        SharedModule, routing
    ],
    declarations: [AppComponent, CounterComponent],
    providers: [counterServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {

}

