import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

/////////////////////////////
import { AppSettingComponent } from './setting/setting.component';
import { AuthGuard, LoginComponent } from './login/index';
import { PageNotFoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    { path: 'setting', component: AppSettingComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', component: PageNotFoundComponent }
]

import { HeaderModule } from './shared/header/header.module';
import { NavModule } from './shared/nav/nav.module';
import { TranslateModule } from '../x/i18n/';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [AppSettingComponent, LoginComponent, PageNotFoundComponent],
    providers: [AuthGuard],
    exports: [
        RouterModule, CommonModule, BrowserModule,
        FormsModule, ReactiveFormsModule, TranslateModule,
        HeaderModule, NavModule
    ]
})
export class PageModule {

}