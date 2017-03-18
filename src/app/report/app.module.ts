import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { ReportComponent, ReportFilterModule } from "./component/";
import { reportServiceProvider } from "./service";

@NgModule({
  imports: [
    SharedModule, routing,
    ReportFilterModule
  ],
  declarations: [AppComponent, ReportComponent],
  providers: [reportServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {

}
