import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../pages/';
import { SettingComponent } from './setting.component';
import { routing } from './setting.routing';
import { AppComponent } from './app.component';

import { I18n,Auth } from '../shared/';

@NgModule({
  imports: [
    PageModule, CommonModule,
    routing, I18n.forRoot("setting")],
  declarations: [AppComponent, SettingComponent],
  bootstrap: [AppComponent]
})
export default class SettingModule {

}


import { SetAppName } from '../config/';
SetAppName('setting');
Auth.AuthOptions.scope = "report";
