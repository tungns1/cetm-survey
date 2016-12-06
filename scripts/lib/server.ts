import * as path from 'path';
import * as chokidar from 'chokidar';
import * as chalk from 'chalk';
import * as open from 'open';
import { Observable } from 'rxjs';
import { clean } from './clean';
import { generateDev } from './generate_html';
import { copyPublic } from './copy';
import { Build } from './build';
import { compileSass } from './css';
import { removeModuleIdFromComponents } from './helpers';
import { Apps } from '../app';

const srcFolder = path.join(__dirname, "../../src");

function srcSubFolder(file: string) {
    return path.relative(srcFolder, path.resolve(file)).split(path.sep)[0];
}

export class Server {
    private options: any;
    private builders: Build[];
    private apps = Apps;

    constructor() {
        this.builders = this.apps.map(a => new Build(a));
    }

    buildDev() {
        let v = this.builders.map(b => b.buildDev());
        v = v.concat(this.builders[0].buildDevVendor());
        return Observable.forkJoin(v).map(data => data.join('\n'));
    }

    buildDevMain(app?: string) {
        const builder = this.builders.find(b => b.appName == app);
        if (builder) {
            return builder.buildDevMain();
        }
        return Observable.forkJoin(this.builders.map(b => b.buildDevMain())).map(data => data.join('\n'));
    }

    generateDev() {
        let v = this.apps.map(a => generateDev(a));
        return Observable.forkJoin(v).map(data => data.join('\n'));
    }

    get watch(): Observable<any> {
        return new Observable(observer => {
            const sassSrc = path.resolve(__dirname, '../../src/styles/app.scss');
            const cssDest = path.resolve(__dirname, '../../dist/css/app.css');

            const watcher = chokidar.watch(path.resolve(__dirname, '../../src'), {
                persistent: true
            });

            const publicWatcher = chokidar.watch(path.resolve(__dirname, '../../public'), {
                persistent: true
            });

            watcher.on('ready', () => {
                observer.next(chalk.green('-------------------------------------------------------'));

                clean('dist')
                    .concat(removeModuleIdFromComponents())
                    .concat(copyPublic())
                    .concat(this.generateDev())
                    .concat(compileSass(sassSrc, cssDest))
                    .concat(this.buildDev()).subscribe(data => {
                        observer.next(data);
                    }, err => {
                        console.log(chalk.red(err));
                    }, () => {
                        // open('http://localhost:4200/admin/');
                        watcher.on('change', (file, stats) => {
                            console.log("changes in", srcSubFolder(file), "\n");
                            let ext: string = path.extname(file);
                            let basename: string = path.basename(file);
                            observer.next(chalk.blue(`${basename} changed...`));
                            const folder = srcSubFolder(file);
                            switch (ext) {
                                case '.html':
                                    if (basename === 'index.html') {
                                        this.generateDev().subscribe(data => console.log(data));
                                    } else {
                                        this.buildDevMain(folder).subscribe(data => { observer.next(data); });
                                    }
                                    break;
                                case '.ts':
                                    this.buildDevMain(folder).subscribe(data => { observer.next(data); });
                                    break;
                                case '.scss':
                                    if (srcSubFolder(file) === "styles") {
                                        setTimeout(_ => {
                                            compileSass(sassSrc, cssDest).subscribe(data => { observer.next(data); });
                                        }, 250);
                                    } else {
                                        this.buildDevMain(folder).subscribe(data => { observer.next(data); });
                                    }
                                    break;
                                default:
                                    break;
                            }
                        });

                        publicWatcher.on('add', () => copyPublic().subscribe(data => console.log(data)));
                        publicWatcher.on('change', () => copyPublic().subscribe(data => console.log(data)));
                        publicWatcher.on('remove', () => copyPublic().subscribe(data => console.log(data)));
                    });
            });
        });
    }
}
