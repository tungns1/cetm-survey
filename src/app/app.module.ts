import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { appRouting } from "./app.routing";
import { SharedService } from "./shared";

import { provideTranslateModule } from './shared/service/i18n';

import { BranchModule } from './shared/branch';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    provideTranslateModule(),
    BranchModule.forRoot(),
    SharedModule.forRoot(),
    appRouting
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
