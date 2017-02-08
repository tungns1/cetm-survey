import { NgModule, ModuleWithProviders, ValueProvider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BranchModule } from './branch';

@NgModule({
    imports: [
        ReactiveFormsModule, CommonModule,
        RouterModule.forChild(routes), I18n.TranslateModule
    ],
    declarations: [AppSettingComponent, LoginComponent, PageNotFoundComponent],
    exports: [
        RouterModule, CommonModule, FormsModule, ReactiveFormsModule,
        I18n.TranslateModule, BranchModule
    ]
})
export class SharedModule {
    static forRoot(appName: string): ModuleWithProviders {
        const appServiceProvider = <ValueProvider>{
            provide: AppService,
            useValue: new AppService(appName)
        };

        return {
            ngModule: SharedModule,
            providers: [Auth.AuthGuard, appServiceProvider]
        }
    }
}