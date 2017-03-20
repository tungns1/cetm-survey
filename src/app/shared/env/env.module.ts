import {
    NgModule, ModuleWithProviders,
    ValueProvider, FactoryProvider
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RuntimeEnvironment } from './env';
import { AbstractStorageStrategy } from '../shared';

@NgModule({
    imports: [CommonModule]
})
export class EnvironmentModule {
    static Providers() {
        return [RuntimeEnvironment]
    }
}