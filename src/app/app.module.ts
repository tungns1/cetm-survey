import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CoreModule } from './shared/core.module';
import { AuthProvider } from './auth';
import { QmsNativeModule } from '../native/qms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    QmsNativeModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
