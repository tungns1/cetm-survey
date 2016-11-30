import { socket } from './backend/index';
import { Model } from './shared';

// #/branch_code/counter_code
const parts = window.location.hash.split("/");
const branch_code = parts[parts.length - 2];
const counter_code = parts[parts.length - 1];


import AppModule from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
