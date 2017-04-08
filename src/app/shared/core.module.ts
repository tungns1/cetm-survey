import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { Ng2BasicModule } from './shared';
import { BranchModule } from './branch';
import { SharedModule } from './shared.module';
import { HttpModule } from "@angular/http";
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        BranchModule.forRoot(),
        SharedModule.forRoot(),
        Ng2BasicModule
    ],
    providers: [
        { provide: OverlayContainer, useValue: FullscreenOverlayContainer }
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}