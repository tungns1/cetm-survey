import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { EnvironmentSettingComponent } from './environment-setting/environment-setting.component';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../shared/directive/directive.module';
import { ApplicationStoreComponent } from './application-store/application-store.component';

const routing = RouterModule.forChild([
  { path: '', component: SettingComponent }
]);

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    DirectiveModule,
    routing
  ],
  declarations: [
    SettingComponent,
    EnvironmentSettingComponent,
    ApplicationStoreComponent
  ],
})
export class SettingModule { }
