import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { routing } from "./app.routing";
import { ReportComponent } from './report/report.component';
import { ReportFilterModule } from "./component/";
import { reportServiceProvider } from "./service";

@NgModule({
  imports: [
    SharedModule, routing,
    ReportFilterModule
  ],
  declarations: [ReportComponent],
  providers: [reportServiceProvider],
})
export class AppModule {

}
