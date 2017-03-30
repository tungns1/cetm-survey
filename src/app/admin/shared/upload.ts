import { FactoryProvider } from '@angular/core';
import { RuntimeEnvironment } from '../../shared';
import {
    UploadURLToken
} from '../../x/ng/upload/';

export function __uploadUrlTokenFactory(env: RuntimeEnvironment) {
    return env.Platform.Http;
}

export const provideUploadURLToken: FactoryProvider = {
    deps: [RuntimeEnvironment],
    provide: UploadURLToken,
    useFactory: __uploadUrlTokenFactory
}

export {
    MultiFilePickerModule
} from '../../x/ng/upload/';