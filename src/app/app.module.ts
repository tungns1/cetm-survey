import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { appRouting } from "./app.routing";
import { BaseAppModule, SharedService } from "./shared";

const appName = "admin";
const appState = new SharedService.AppState(appName);

@NgModule({
  declarations: [ 
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BaseAppModule,
    appRouting
  ],
  providers: [
    appState.toProvider()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
