import * as Branch from './branch/';
import * as Model from './model/';
import * as SharedPipe from './pipe/';
import * as SharedConfig from './config/';
import * as SharedService from './service/';
import * as SharedUtil from './util/';

import { SharedModule } from './shared.module';
import { NewBaseAppModule } from './BaseApp.module';

import * as Lib from '../x/';

export {
    Branch, Model,
    SharedConfig, SharedUtil,
    SharedService, SharedPipe, SharedModule,
    NewBaseAppModule,
    Lib
}

import { enableProdMode } from '@angular/core';
enableProdMode();