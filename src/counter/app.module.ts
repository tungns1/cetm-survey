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

import { routing } from './app.routing';
import { PageModule } from '../pages/pages.module';

@NgModule({
    imports: [
        BrowserModule, CommonModule, FormsModule, ReactiveFormsModule,
        PageModule,
        routing, HeaderModule, QueueModule, StatModule, ServingModule
    ],
    declarations: [AppComponent, CounterComponent],
    bootstrap: [AppComponent]
})
export default class CounterModule {
}


