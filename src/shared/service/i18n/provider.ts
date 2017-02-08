import { I18n } from '../../shared';
import { RawTranslateLoader } from './load';

export function provideTranslateModule(files: string | string[]) {
    const v = [].concat(files);
    return I18n.TranslateModule.forRoot({
        provide: I18n.TranslateLoader,
        useFactory: () => new RawTranslateLoader(v)
    })
}
