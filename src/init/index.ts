
/********************************************** */
import { Const } from '../const';
import { SetStoragePrefix } from '../lib/platform';
SetStoragePrefix(Const.LOCAL_SETTING_KEYS.STORAGE_PREFIX);

/********************************************** */
import { enableProdMode } from '@angular/core';
import { environment } from '../environments/environment';
if (environment.production) {
  enableProdMode();
}

export { getTranslationProviders } from './i18n-providers';
export { LoadConfig } from './global-config';
