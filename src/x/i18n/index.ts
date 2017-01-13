import {NgModule, ModuleWithProviders} from "@angular/core";
import {Http, HttpModule} from "@angular/http";
import {TranslatePipe} from "./translate.pipe";
import {TranslateParser, DefaultTranslateParser} from "./translate.parser";
import {TranslateService, TranslateLoader, TranslateStaticLoader} from "./translate.service";
import {TranslateDirective} from "./translate.directive";

export * from "./translate.pipe";
export * from "./translate.service";
export * from "./translate.parser";
export * from "./translate.directive";

export function translateLoaderFactory(http: Http) {
    return new TranslateStaticLoader(http);
}

@NgModule({
    imports: [HttpModule],
    declarations: [
        TranslatePipe,
        TranslateDirective
    ],
    exports: [
        HttpModule, // todo remove this when removing the loader from core
        TranslatePipe,
        TranslateDirective
    ]
})
export class TranslateModule {
    static forRoot(providedLoader: any = {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [Http]
    }): ModuleWithProviders {
        return {
            ngModule: TranslateModule,
            providers: [
                providedLoader,
                TranslateService,
                { provide: TranslateParser, useClass: DefaultTranslateParser }
            ]
        };
    }
}