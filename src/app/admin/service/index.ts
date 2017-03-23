
import { houseServiceProviders } from './house';
import { centerServiceProviders } from './center/';
import { orgServiceProvider } from './org';
import { metaServiceProviders } from './meta';

import { shareServiceProvider } from './shared';

const adminServiceProvider = [
    orgServiceProvider,
    centerServiceProviders,
    houseServiceProviders,
    metaServiceProviders,
    shareServiceProvider
]

export * from './shared';
export * from './house';
export * from './center';
export * from './org';
export * from './meta';

export {
    adminServiceProvider
}