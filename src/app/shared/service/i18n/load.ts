import { RawHttp } from '../../shared';
import { TranslateLoader } from '../../../x/i18n';

function LoadI18n(lang: string, app: string) {
    const uri = `./i18n/${lang}/${app}.json`;
    return RawHttp("GET", uri).then(res => {
        try {
            let v = JSON.parse(res);
            return v;
        } catch (e) {
            console.error(`parse json from ${uri} failed ${e}`);
            return {};
        }
    });
}

function LoadMultiple(lang: string, files: string[]) {
    const obs = files.map(v => LoadI18n(lang, v));
    return forkJoin(obs).map(v => Object.assign.apply(null, [{}].concat(v)));
}

import { forkJoin } from 'rxjs/observable/forkJoin';

export class RawTranslateLoader implements TranslateLoader {
    getTranslation(lang: string) {
        return LoadMultiple("en", ['shared']);
    }
}