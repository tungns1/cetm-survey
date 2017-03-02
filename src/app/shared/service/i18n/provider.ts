import { I18n } from '../../shared';
import { RawTranslateLoader } from './load';
import { AppState } from '../app.service';

export function provideTranslateModule() {
    return I18n.TranslateModule.forRoot({
        provide: I18n.TranslateLoader,
        deps: [AppState],
        useFactory: (state: AppState) => {
            const files = [].concat(state.AppName);
            return new RawTranslateLoader(files);
        }
    })
}
