import { NgModule, ModuleWithProviders } from '@angular/core';
import { BranchModule } from './branch/';
import { NavModule, HeaderModule } from './component/';
import { SharedModule } from './shared.module';
import { I18n, Auth } from './service/';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        SharedModule.forRoot(),
        I18n.provideTranslateModule(),
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
})
export class BaseAppModule {
    
}
