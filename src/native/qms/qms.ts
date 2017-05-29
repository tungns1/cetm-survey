import {
    Injectable, NgModule, ModuleWithProviders,
    ValueProvider, FactoryProvider
} from '@angular/core';
import { Const } from '../../const';
import {
    AbstractStorageStrategy, LocalStorageStrategy
} from '../../lib/platform';


@Injectable()
export class QmsService {
    device(path: string): any {
        console.log('device is not supported');
        return null;
    }
    
    __x = new XWinService();

    listen(event: string, cb: (event: string, args: any) => any) {

    }

    readonly isBrowser = true;
}

export interface XWinRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface MiniModeOptions {
    no_focusable: boolean;
    always_on_top: boolean;
    no_resizable: boolean;
}

export interface XWinMiniMode {
    rect: XWinRectangle;
    options: MiniModeOptions;
}

@Injectable()
export class XWinService {
    Broadcast(event: string, data?: any) {}
    Send(event: string, data?: any) {}
    SetMiniMode(ratio: XWinRectangle, mini?: boolean, options?: MiniModeOptions) {}
    readonly isBrowser = true;
}

@Injectable()
export class XWinStorageStrategy extends AbstractStorageStrategy {
    constructor(
        private qms: QmsService
    ) {
        super();
        console.log('xwin storage');
    }

    private get xwin(): any {
        return this.qms['__x'];
    }

    saveRaw(key: string, value: string) {
        this.xwin.SetRuntime(key, value);
    }

    readRaw(key: string) {
        return this.xwin.GetRuntime(key);
    }
}

export function __newQmsService(): QmsService {
    return window['__QMS'] || new QmsService();
}

export function __newXWinService(qms: QmsService) {
    return qms.isBrowser ? new XWinService() : qms['__x'];
}

export function __newXWinStorageStrategy(qms: QmsService) {
    return qms.isBrowser ? new LocalStorageStrategy() :
        new XWinStorageStrategy(qms);
}

export const QmsServiceProvider: FactoryProvider = {
    provide: QmsService,
    useFactory: __newQmsService
}

export const XWinServiceProvider: FactoryProvider = {
    provide: XWinService,
    deps: [QmsService],
    useFactory: __newXWinService
}

export const XWinStorageProvider: FactoryProvider = {
    provide: XWinStorageStrategy,
    deps: [QmsService],
    useFactory: __newXWinStorageStrategy
}

@NgModule({

})
export class QmsNativeModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: QmsNativeModule,
            providers: [
                QmsServiceProvider,
                XWinServiceProvider,
                XWinStorageProvider
            ]
        }
    }
}
