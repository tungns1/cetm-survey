import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from './shared/core.module';
import { AuthProvider } from './auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule
  ],
  providers: [AuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
