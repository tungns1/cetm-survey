import { L10nText, Localize } from './i18n'

export class TranslateService {
    constructor() {
    }

    translateData: { [index: string]: L10nText } = {
        'Code does not exist': {
            vi: 'Mã khách hàng không tồn tại',
            en: 'Code does not exist',
            sp: 'hihi'
        }
    }

    translate(txt: string) {
        return Localize(this.translateData[txt]);
    }

}