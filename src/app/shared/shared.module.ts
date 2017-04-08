import { NgModule, ModuleWithProviders, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { UtilPipeModule } from "./pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectiveModule } from './directive/directive.module';
import { NavModule, HeaderModule } from "./component/";
import { authProviders } from './auth';
import { EnvironmentModule } from './env';
import { ModalModule, SelectCheckModule } from '../x/ng';
import { ExportExcelService } from '../x/ng';
import { LogService, RouterQueryStorageStrategy } from './shared';
import { AppSocketGenerator, HttpServiceGenerator } from './service';
import { MaterialModule } from '@angular/material';


@NgModule({
    imports: [

    ],
    exports: [
        CommonModule,
        MaterialModule,
        DirectiveModule,
        EnvironmentModule,
        FormsModule, ReactiveFormsModule,
        FlexLayoutModule, NavModule, HeaderModule,
        UtilPipeModule, SelectCheckModule,
        ModalModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                EnvironmentModule.Providers(),
                ExportExcelService,
                authProviders,
                LogService, RouterQueryStorageStrategy,
                AppSocketGenerator, HttpServiceGenerator
            ]
        }
    }
}