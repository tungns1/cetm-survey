import { NgModule, ModuleWithProviders, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { UtilPipeModule } from "./pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectiveModule } from './directive/directive.module';
import { NavModule, HeaderModule } from "./component/";
import { EnvironmentModule } from './env';
import { ModalModule, SelectCheckModule, ExportModule } from '../x/ng';
import { LogService, RouterQueryStorageStrategy } from './shared';
import { AppSocketGenerator, HttpServiceGenerator } from './service';
import { Ng2BasicModule } from './shared';
import { BusinessModule } from './businessQapp/business.module';

@NgModule({
    imports: [

    ],
    exports: [
        CommonModule,
        DirectiveModule,
        EnvironmentModule,
        Ng2BasicModule,
        FormsModule, ReactiveFormsModule,
        FlexLayoutModule, NavModule, HeaderModule,
        UtilPipeModule, SelectCheckModule,
        ModalModule, BusinessModule,
        ExportModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                EnvironmentModule.Providers(),
                LogService, RouterQueryStorageStrategy,
                AppSocketGenerator, HttpServiceGenerator
            ]
        }
    }
}