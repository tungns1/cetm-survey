import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Branch, SharedService } from "./shared/";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { routing } from "./monitor.routing";
import { AppComponent } from "./monitor.component";
import { monitorServiceProvider } from "./service/";
import { MonitorComponent, MonitorFilterModule } from "./component/";


@NgModule({
  imports: [
    SharedModule, routing, MonitorFilterModule
  ],
  declarations: [AppComponent, MonitorComponent],
  providers: [monitorServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}
