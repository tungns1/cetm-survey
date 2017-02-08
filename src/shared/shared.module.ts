import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AppSettingComponent, LoginComponent, PageNotFoundComponent } from './component/';

import { AppService, Auth } from './service/';

const routes: Routes = [
    { path: 'setting', component: AppSettingComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', component: PageNotFoundComponent }
]

import { I18n } from './shared';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
    declarations: [AppSettingComponent, LoginComponent, PageNotFoundComponent],
    exports: [
        RouterModule, CommonModule, BrowserModule,
        FormsModule, ReactiveFormsModule, I18n.TranslateModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [Auth.AuthGuard, AppService]
        }
    }
}