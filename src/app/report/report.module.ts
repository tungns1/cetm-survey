import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "./shared/";
import { routing } from "./report.routing";
import { ReportComponent } from './report/report.component';
import { ReportFilterModule, reportServiceProvider } from "./shared";

@NgModule({
  imports: [
    SharedModule, routing,
    ReportFilterModule
  ],
  declarations: [ReportComponent],
  providers: [reportServiceProvider],
})
export class ReportModule {

}
