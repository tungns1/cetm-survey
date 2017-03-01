import 'reflect-metadata';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';
import { Observable } from 'rxjs';
import * as ts from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import { CodeGenerator } from '@angular/compiler-cli';
import * as spinner from './spinner';
import { timeHuman } from './helpers';
import { getConfig } from './config';
import * as sass from 'node-sass';
import * as cleanCss from 'clean-css';
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const angular = require('rollup-plugin-angular');
const tsr = require('rollup-plugin-typescript');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const serve = require('rollup-plugin-serve');
const livereload = require('../plugins/rollup-plugin-livereload');

const externals = {
  '@angular/core': 'vendor._angular_core',
  '@angular/common': 'vendor._angular_common',
  '@angular/platform-browser': 'vendor._angular_platformBrowser',
  '@angular/platform-browser-dynamic': 'vendor._angular_platformBrowserDynamic',
  '@angular/router': 'vendor._angular_router',
  '@angular/http': 'vendor._angular_http',
  '@angular/forms': 'vendor._angular_forms',
  "@angular/material": 'vendor._angular_material',
  '@ngrx/core': 'vendor._ngrx_core',
  '@ngrx/store': 'vendor._ngrx_store',
  'rxjs': 'vendor.rxjs'
}

let debug = true;

export class Build {
  public cache: any;
  public building: boolean;
  public config: any;

  constructor(public appName: string) {
    this.building = false;
    this.config = getConfig();
  }

  get SrcMain() {
    return path.resolve(__dirname, `../../src/${this.appName}/main.ts`)
  }

  get DistMain() {
    return path.resolve(__dirname, `../../dist/${this.appName}/main.js`)
  }

  buildDev(): Observable<any> {
    if (debug) {
      return this.buildDevMain();
    }
    return this.buildDevMain().concat(this.buildDevVendor());
  }

  buildDevMain(): Observable<any> {
    return Observable.create(observer => {
      let start: Date = new Date();
      spinner.start('Building [' + this.appName + "]...");
      this.devMainBuilder().subscribe(bundle => {
        // this.cache = bundle;
        Observable.fromPromise(bundle.write({
          format: 'iife',
          dest: this.DistMain,
          sourceMap: true,
          globals: Object.assign(externals, this.config.externalPackages)
        })).subscribe(resp => {
          let time: number = new Date().getTime() - start.getTime();
          spinner.stop();
          observer.next(`${chalk.green('✔')} ${chalk.yellow(`Build Time [${this.appName}] (main): ${timeHuman(time)}`)}`);
          observer.complete();
        });
      }, err => {
        this.cache = null;
        observer.next(chalk.red(`✖ Compile error: ${err}`));
        spinner.stop();
        observer.complete();
      });
    });
  }

  devMainBuilder(): Observable<any> {
    return Observable.fromPromise(rollup.rollup({
      entry: this.SrcMain,
      // cache: this.cache,
      context: 'this',
      plugins: [
        angular({
          preprocessors: {
            style: src => {
              return sass.renderSync({ data: src, outputStyle: 'compressed' }).css;
            }
          }
        }),
        tsr({
          typescript: require('../../node_modules/typescript')
        }),
        commonjs(),
        nodeResolve({ jsnext: true, main: true, browser: true }),
        buble()
      ],
      external: Object.keys(externals).concat(Object.keys(this.config.externalPackages))
    }));
  };

  buildDevVendor(): Observable<any> {
    return Observable.create(observer => {
      let start: Date = new Date();
      spinner.start('Building...');
      this.devVendorBuilder().subscribe(bundle => {
        // this.cache = bundle;
        Observable.fromPromise(bundle.write({
          format: 'iife',
          moduleName: 'vendor',
          dest: path.resolve(__dirname, '../../dist/vendor.js')
        })).subscribe(resp => {
          let time: number = new Date().getTime() - start.getTime();
          spinner.stop();
          observer.next(`${chalk.green('✔')} ${chalk.yellow(`Build Time (vendor): ${timeHuman(time)}`)}`);
          observer.complete();
        });
      }, err => {
        observer.next(chalk.red(`✖ Compile error: ${err}`));
        spinner.stop();
        observer.complete();
      });
    });
  }

  devVendorBuilder(): Observable<any> {
    return Observable.fromPromise(rollup.rollup({
      entry: path.resolve(__dirname, '../../src/vendor.ts'),
      context: 'this',
      plugins: [
        angular({
          preprocessors: {
            style: src => {
              return sass.renderSync({ data: src, indentedSyntax: true, outputStyle: 'compressed' }).css;
            }
          }
        }),
        tsr({
          typescript: require('../../node_modules/typescript')
        }),
        commonjs(),
        nodeResolve({ jsnext: true, main: true, browser: true }),
        buble(),
        serve({
          contentBase: 'dist/',
          historyApiFallback: false,
          port: 4200
        }),
        livereload({
          watch: 'dist/',
          consoleLogMsg: false
        })
      ]
    }));
  };

  get buildProd(): Observable<any> {
    return this.ngc('tsconfig.aot.json').concat(this.runBuildProd);
  }

  get runBuildProd(): Observable<any> {
    return Observable.create(observer => {
      let start: Date = new Date();
      spinner.start('Building...');
      this.prodBuilder.subscribe(bundle => {
        Observable.fromPromise(bundle.write({
          format: 'iife',
          dest: path.resolve(__dirname, '../../dist/app.js'),
          sourceMap: true,
          moduleName: 'app'
        })).subscribe(resp => {
          let time: number = new Date().getTime() - start.getTime();
          spinner.stop();
          observer.next(`${chalk.green('✔')} ${chalk.yellow(`Build time: ${timeHuman(time)}`)}`);
          observer.complete();
        });
      }, err => {
        observer.next(chalk.red(`✖ Compile error: ${err}`));
        spinner.stop();
        observer.complete();
      });
    });
  }

  get prodBuilder(): Observable<any> {
    return Observable.fromPromise(rollup.rollup({
      entry: path.resolve(__dirname, '../../src/main.aot.ts'),
      context: 'this',
      plugins: [
        angular({
          preprocessors: {
            style: src => {
              return sass.renderSync({ data: src, indentedSyntax: true, outputStyle: 'compressed' }).css;
            }
          }
        }),
        tsr({
          typescript: require('../../node_modules/typescript')
        }),
        commonjs(),
        nodeResolve({ jsnext: true, main: true, browser: true }),
        buble(),
        uglify()
      ]
    }));
  };

  private codegen(ngOptions: tsc.AngularCompilerOptions, cliOptions: tsc.NgcCliOptions, program: ts.Program, host: ts.CompilerHost) {
    return CodeGenerator.create(ngOptions, cliOptions, program, host).codegen({
      transitiveModules: true
    });
  }

  private ngc(config: string): Observable<any> {
    return Observable.create(observer => {
      let start: Date = new Date();
      const cliOptions = new tsc.NgcCliOptions({});
      spinner.start('Building...');
      tsc.main(path.resolve(__dirname, `../../${config}`), cliOptions, this.codegen)
        .then(() => {
          let time: number = new Date().getTime() - start.getTime();
          spinner.stop();
          observer.next(`${chalk.green('✔')} ${chalk.yellow(`AoT Build Time: ${timeHuman(time)}`)}`);
          observer.complete();
        });
    });
  }
}
