import { TranslateModule, TranslateLoader } from '../../../x/i18n';
import { RawTranslateLoader } from './load';

export function provideTranslateModule() {
    return TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: () => {
            const files = [];
            return new RawTranslateLoader(files);
        }
    })
}
