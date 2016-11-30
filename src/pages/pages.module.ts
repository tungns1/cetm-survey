import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

/////////////////////////////
import { AppSettingComponent } from './setting/setting.component';
import { AuthGuard, AuthService, LoginComponent } from './login/index';

const routes: Routes = [
    { path: 'setting', component: AppSettingComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', component: "PageNotFoundComponent" }
]

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [AppSettingComponent, LoginComponent],
    providers: [AuthService, AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    exports: [RouterModule]
})
export class PageModule { }