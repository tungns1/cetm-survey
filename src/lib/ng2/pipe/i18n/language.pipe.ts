import { Pipe, PipeTransform } from '@angular/core';

const LanguageNames = {
    en: "English",
    vi: "Tiếng Việt",
    sp: "Español"
}

@Pipe({
    name: "languageName"
})
export class LanguageNamePipe {
    transform(code: string) {
        return LanguageNames[code] || code;
    }
}

@Pipe({
    name: "cultureName"
})
export class CultureNamePipe {
    transform(code: string) {
        return LanguageNames[code] || code;
    }
}