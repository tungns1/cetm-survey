import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { CounterComponent } from "./counter/counter.component";
import { routing } from "./counter.routing";
import { SettingComponent } from './setting/setting.component';

@NgModule({
    imports: [
        SharedModule, routing
    ],
    declarations: [CounterComponent, SettingComponent]
})
export class CounterModule {

}

