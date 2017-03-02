import { NgModule, ModuleWithProviders, ValueProvider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AppSettingComponent, LoginComponent, PageNotFoundComponent } from './component/';

import { AppState, Auth } from './service/';

const routes: Routes = [
    { path: 'setting', component: AppSettingComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', component: PageNotFoundComponent }
]

import { I18n, Ng } from './shared';
import { UtilPipeModule } from './pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        ReactiveFormsModule, CommonModule,
        RouterModule.forChild(routes), I18n.TranslateModule
    ],
    declarations: [AppSettingComponent, LoginComponent, PageNotFoundComponent],
    exports: [
        RouterModule, CommonModule, FormsModule, ReactiveFormsModule,
        FlexLayoutModule,
        I18n.TranslateModule, UtilPipeModule, Ng.SelectCheckModule, Ng.ModalModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}