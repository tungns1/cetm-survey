export * from './filter';
export * from './crud';
export * from './nav';

import { AdminFilterService } from './filter';
import { AdminNavService } from './nav';

export const shareServiceProvider = [
    AdminFilterService,
    AdminNavService
]