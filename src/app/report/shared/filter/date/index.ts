import { Locales } from './locales';
import { AppStorage } from '../../shared';
export * from './date-picker.module';

Flatpickr.localize(Locales[AppStorage.Culture]);
