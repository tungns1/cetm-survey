/********************************************** */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { getTranslationProviders, LoadConfig } from './init';

LoadConfig()
  .then(_ => getTranslationProviders())
  .then(providers => {
    const options = { providers };
    platformBrowserDynamic().bootstrapModule(AppModule, options);
  });