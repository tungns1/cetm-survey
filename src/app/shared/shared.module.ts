import { NgModule, ModuleWithProviders, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, LocationStrategy, HashLocationStrategy } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";

import { Auth } from "./service/";

import { I18n, Ng } from "./shared";
import { UtilPipeModule } from "./pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavModule, HeaderModule } from "./component/";
import { authProviders } from './service/auth';
import { I18nService } from './service/i18n';
import { EnvironmentModule } from './env';

@NgModule({
    imports: [
        ReactiveFormsModule, CommonModule, I18n.TranslateModule
    ],
    exports: [
        RouterModule, CommonModule, FormsModule, ReactiveFormsModule,
        FlexLayoutModule, NavModule, HeaderModule,
        I18n.TranslateModule, UtilPipeModule, Ng.SelectCheckModule, Ng.ModalModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                EnvironmentModule.Providers(),
                authProviders, I18nService.provider()
            ]
        }
    }
}