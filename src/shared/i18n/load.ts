import { TranslateLoader, TranslateStaticLoader } from '../../x/i18n/';
import { GetRaw } from '../../x/backend/';

function LoadI18n(lang: string, app: string) {
    const uri = `../asset/i18n/${lang}/${app}.json`;
    return GetRaw(uri).map(res => {
        if (res.status == 200) {
            try {
                let v = JSON.parse(res.body);
                return v;
            } catch (e) {
                console.error(`parse json from ${uri} failed ${e}`);
                return {};
            }
        } else {
            console.error(`load file ${uri} failed ${res.body}`);
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
    constructor(private files: string[]) { }
    getTranslation(lang: string) {
        return LoadMultiple(lang, ['shared'].concat(this.files));
    }
}