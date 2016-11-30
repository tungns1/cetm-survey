import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderModule } from '../shared/header/header.module';
// Component
import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';

import { appRoutingProviders, routing } from './app.routing';
import { LoginComponent } from '../shared/auth/login.component';

@NgModule({
    imports: [
        BrowserModule, CommonModule, FormsModule, ReactiveFormsModule,
        routing, HeaderModule, QueueModule, StatModule, ServingModule
    ],
    providers: [appRoutingProviders],
    declarations: [AppComponent, CounterComponent, LoginComponent],
    bootstrap: [AppComponent]
})
export default class CounterModule {
}


