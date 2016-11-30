import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

/////////////////////////////
import { AppSettingComponent } from './setting/setting.component';
import { AuthGuard, AuthService, LoginComponent } from './login/index';
import { PageNotFoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    { path: 'setting', component: AppSettingComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', component: PageNotFoundComponent }
]

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [AppSettingComponent, LoginComponent, PageNotFoundComponent],
    providers: [AuthService, AuthGuard],
    exports: [RouterModule]
})
export class PageModule {

}