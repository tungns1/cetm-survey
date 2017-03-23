import {
    NgModule, ModuleWithProviders,
    ValueProvider, FactoryProvider
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RuntimeEnvironment } from './shared';
import { AbstractStorageStrategy } from '../shared';
import { AppEnvModuleComponent, AppEnvSubModuleComponent } from './env-set/env-set.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AppEnvModuleComponent, AppEnvSubModuleComponent],
    exports: [AppEnvModuleComponent, AppEnvSubModuleComponent]
})
export class EnvironmentModule {
    static Providers() {
        return [RuntimeEnvironment]
    }
}