import { NgModule, ModuleWithProviders } from '@angular/core';
import { SetAppName } from './config/';
import { BranchModule } from './branch/';
import { NavModule, HeaderModule } from './component/';
import { SharedModule } from './shared.module';
import { I18n } from './service/';

export function NewBaseAppModule(appName: string) {
    SetAppName(appName);
    @NgModule({
        imports: [
            SharedModule.forRoot(),
            BranchModule, NavModule, HeaderModule,
            I18n.provideTranslateModule(appName),
        ],
        exports: [
            NavModule, HeaderModule,
            BranchModule, SharedModule
        ]
    }) class BaseAppModule {
    }
    return BaseAppModule;
}

