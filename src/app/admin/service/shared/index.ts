export * from './crud';
export * from './nav';

export * from '../../../shared/model';

import { AdminNavService } from './nav';

export const shareServiceProvider = [
    AdminNavService
]