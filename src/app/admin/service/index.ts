
import { houseServiceProviders } from './house';
import { centerServiceProviders } from './center/';
import { orgServiceProvider } from './org';
import { metaServiceProviders } from './meta';
import { AdminNavService } from './nav';

const adminServiceProvider = [
    AdminNavService,
    orgServiceProvider,
    centerServiceProviders,
    houseServiceProviders,
    metaServiceProviders
]

export * from './shared';
export * from './house';
export * from './center';
export * from './org';
export * from './meta';
export { AdminNavService } from './nav';

export {
    adminServiceProvider
}