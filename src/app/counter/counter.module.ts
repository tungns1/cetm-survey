import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";

@NgModule({
    imports: [
        SharedModule, routing
    ],
    declarations: [CounterComponent]
})
export class CounterModule {

}

