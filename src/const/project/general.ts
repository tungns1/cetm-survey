
export interface IGeneralConfig {
    default_language?: string;
    supported_languages?: string[];
}

export class GeneralConfig {
    constructor(private _c: IGeneralConfig = {}) { }
    get default_language() {
        return this._c.default_language || 'en';
    }
    get supported_languages() {
        return this._c.supported_languages || ["en"];
    }
    get default_culture() {
        return this.default_language;
    }
    get supported_cultures() {
        return this.supported_languages;
    }
    __update(c: IGeneralConfig) {
        if (!c) return;
        this._c = c;
    }
}