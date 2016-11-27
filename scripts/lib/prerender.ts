let __compiler__ = require('@angular/compiler');
import { __core_private__ } from '@angular/core';
let patch = false;
if (!__core_private__['ViewUtils']) {
  patch = true;
  __core_private__['ViewUtils'] = __core_private__['view_utils'];
}



if (!__compiler__.__compiler_private__) {
  patch = true;
  (__compiler__).__compiler_private__ = {
    SelectorMatcher: __compiler__.SelectorMatcher,
    CssSelector: __compiler__.CssSelector
  }
}

let __universal__ = require('angular2-platform-node/__private_imports__');
if (patch) {
  __universal__.ViewUtils = __core_private__['view_utils'];
  __universal__.CssSelector = __compiler__.CssSelector;
  __universal__.SelectorMatcher = __compiler__.SelectorMatcher;
}

import 'core-js/client/shim';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/long-stack-trace-zone';

import { getConfig } from './config';
import { AppModule } from '../../src/app/app.module.universal';
import * as path from 'path';
import * as fs from 'fs';
import { Observable } from 'rxjs';
import { generateFromString } from './generate_html';
import { platformNodeDynamic } from 'ng2-platform-node';

declare var Zone: any;

export function run(): Observable<any> {
  let config = getConfig();
  let urls: Observable<any>[] = config.universalRoutes.map(route => prerender(route));
  return Observable.concat(...urls);
};

export function prerender(url: string): Observable<any> {
  return new Observable(observer => {
    const options = {
      precompile: true,
      time: false,
      ngModule: AppModule,
      originUrl: 'http://localhost:3000/',
      baseUrl: '/',
      requestUrl: url,
      document: fs.readFileSync(path.resolve(__dirname, '../../src/index.html')).toString(),
      preboot: false,
      compilerOptions: require('../../tsconfig.json').compilerOptions
    };

    const platformRef: any = platformNodeDynamic();

    const zone = Zone.current.fork({
      properties: options
    });

    zone.run(() => (platformRef.serializeModule(options.ngModule, options)).then(html => {
      generateFromString(html.replace(/&lt;/g, '<').replace(/&gt;/g, '>'), url);
      observer.complete();
    }));
  });
}
