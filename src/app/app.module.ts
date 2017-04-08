import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from './shared/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
