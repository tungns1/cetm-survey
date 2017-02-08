import * as Branch from './branch/';
import * as Model from './model/';
import * as SharedPipe from './pipe/';
import * as SharedConfig from './config/';
import * as SharedService from './service/';

import { SharedModule } from './shared.module';
import { NewBaseAppModule } from './BaseApp.module';

export {
    Branch, Model,
    SharedConfig,
    SharedService, SharedPipe, SharedModule,
    NewBaseAppModule
}


import { enableProdMode } from '@angular/core';
enableProdMode();