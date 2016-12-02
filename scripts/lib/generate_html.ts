import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import * as chalk from 'chalk';
import { Observable } from 'rxjs';
import { getConfig } from './config';

const config = getConfig();


function DestIndex(app: string) {
  return path.resolve(__dirname, `../../dist/${app}/index.html`);
}

function Generate(app: string, styles: string[], scripts: string[]) {
  const index = path.resolve(__dirname, `../../src/${app}/index.html`);
  const dest = path.resolve(__dirname, `../../dist/${app}/index.html`);
  const content = _.template(fs.readFileSync(index).toString());
  return new Observable(observer => {

    fs.outputFile(dest, content({ styles: styles, scripts: scripts }), err => {
      if (err) {
        observer.error(err);
      }
      observer.complete();
    });
  });
}

export function generateDev(app: string): Observable<any> {
  const styles = config.styles;
  const scripts = ['../vendor.js', './main.js'];
  return Generate(app, styles, scripts);
};

export function generateProd(): Observable<any> {
  const styles = config.styles;
  const scripts = ['app.js'];
  return Generate("admin", styles, scripts);
};

export function generateFromString(html: string, url: string): void {
  const styles = config.styles;
  const scripts = ['app.js'];
  let parsedHtml = _.template(html);
  url = url === '/' ? 'index' : url;
  let destinationFile = path.resolve(__dirname, `../../dist/${url}.html`);
  fs.outputFileSync(destinationFile, parsedHtml({ styles: styles, scripts: scripts }));
}
