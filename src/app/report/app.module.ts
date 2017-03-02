import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Branch, SharedService } from "./shared/";
import { SharedModule } from "./shared/";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { ReportComponent, ReportFilterModule } from "./component/";
import { reportServiceProvider } from "./service";

const appName = "report";
const appState = new SharedService.AppState(appName);

@NgModule({
  imports: [
    SharedModule, routing,
    ReportFilterModule
  ],
  declarations: [AppComponent, ReportComponent],
  providers: [appState.toProvider(), reportServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}
