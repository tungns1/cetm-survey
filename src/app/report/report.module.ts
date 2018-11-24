import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/";
import { routing } from "./report.routing";
import { ReportComponent } from './report/report.component';
import { ReportFilterModule, reportServiceProvider } from "./shared";

@NgModule({
  imports: [
    SharedModule, routing, HttpClientModule,
    ReportFilterModule
  ],
  declarations: [ReportComponent],
  providers: [reportServiceProvider, ],
})
export class ReportModule {

}
