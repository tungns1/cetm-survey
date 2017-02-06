import { TranslateModule, TranslateLoader, TranslateService } from '../../x/i18n/';
import { RawTranslateLoader } from './load';

export function forRoot(files: string | string[]) {
    const v = [].concat(files);
    return TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: () => new RawTranslateLoader(v)
    })
}

export * from './i18n_service';
export * from './form';

export {
    TranslateService,
    TranslateModule,
}