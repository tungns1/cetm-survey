import { NgModule } from '@angular/core';

// Component
import { AppComponent } from './app.component';
import { CounterComponent } from './counter.component';
import { QueueModule } from './queue/queue.module';
import { StatModule } from './stat/stat.module';
import { ServingModule } from './serving/serving.module';
import { routing } from './app.routing';
import { PageModule } from '../pages/pages.module';
import { I18n } from '../shared/';

@NgModule({
    imports: [
        PageModule, routing,
        QueueModule, StatModule, ServingModule,
        I18n.forRoot("counter"),
    ],
    declarations: [AppComponent, CounterComponent],
    bootstrap: [AppComponent]
})
export default class CounterModule {
}

import { Auth } from './shared/';
Auth.AuthOptions.scope = "staff";
Auth.AuthOptions.auto = true;
