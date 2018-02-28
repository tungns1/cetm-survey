import { HouseService } from './house';
import { CenterService } from './center/';
import { OrgService } from './org';
import { MetaService } from './meta';

import { shareServiceProvider } from './shared';

const adminServiceProvider = [
    OrgService,
    CenterService,
    HouseService,
    MetaService,
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