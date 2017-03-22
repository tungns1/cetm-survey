import {
    NgModule, ModuleWithProviders,
    ValueProvider, FactoryProvider
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RuntimeEnvironment } from './shared';
import { AbstractStorageStrategy } from '../shared';
import { EnvSetComponent } from './env-set/env-set.component';

@NgModule({
    imports: [CommonModule],
    declarations: [EnvSetComponent]
})
export class EnvironmentModule {
    static Providers() {
        return [RuntimeEnvironment]
    }
}