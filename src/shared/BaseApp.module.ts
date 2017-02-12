import { NgModule, ModuleWithProviders } from '@angular/core';
import { SetAppName } from './config/';
import { BranchModule } from './branch/';
import { NavModule, HeaderModule } from './component/';
import { SharedModule } from './shared.module';
import { I18n, Auth } from './service/';
import { BrowserModule } from '@angular/platform-browser';

export function NewBaseAppModule(appName: string) {
    SetAppName(appName);
    @NgModule({
        imports: [
            SharedModule.forRoot(appName),
            I18n.provideTranslateModule(appName),
            BranchModule.forRoot(),
            BrowserModule
        ],
        providers: [
            Auth.authProviders,
            I18n.I18nService.provider()
        ],
        exports: [
            SharedModule, NavModule, HeaderModule
        ]
    }) class BaseAppModule {
    }
    return BaseAppModule;
}

