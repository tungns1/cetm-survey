import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { BranchModule } from './shared/branch';
import { SharedModule } from './shared/shared.module';

import {
  MaterialModule,
  OverlayContainer,
  FullscreenOverlayContainer,
  MdSelectionModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    BranchModule.forRoot(),
    SharedModule.forRoot(),
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: OverlayContainer, useValue: FullscreenOverlayContainer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
