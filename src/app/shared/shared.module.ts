import { NgModule, ModuleWithProviders, ValueProvider } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { UtilPipeModule } from "./pipe";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectiveModule } from './directive/directive.module';
import { NavModule, HeaderModule } from "./component/";
import { authProviders } from './auth';
import { i18nServiceProvider } from './service/i18n';
import { EnvironmentModule } from './env';
import { ModalModule, SelectCheckModule } from '../x/ng';
import { TranslateModule } from '../x/i18n';
import { ExportExcelService } from '../x/ng';
import { LogService, RouterQueryStorageStrategy } from './shared';
import { AppSocketGenerator, HttpServiceGenerator } from './service';
// import { TicketDetailModule } from './ticketDetail/ticketDetail.module';
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
        TranslateModule, UtilPipeModule, SelectCheckModule,
        ModalModule, 
        // TicketDetailModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                EnvironmentModule.Providers(),
                ExportExcelService,
                authProviders, i18nServiceProvider,
                LogService, RouterQueryStorageStrategy,
                AppSocketGenerator, HttpServiceGenerator
            ]
        }
    }
}