import { I18n } from '../../shared';
import { RawTranslateLoader } from './load';

export function provideTranslateModule() {
    return I18n.TranslateModule.forRoot({
        provide: I18n.TranslateLoader,
        useFactory: () => {
            const files = [];
            return new RawTranslateLoader(files);
        }
    })
}
