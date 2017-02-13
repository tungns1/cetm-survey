
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';
import * as Meta from './meta';

import { shareServiceProvider } from './shared';

const adminServiceProvider = [
    Org.OrgService,
    Center.CenterService,
    House.HouseService,
    Meta.MetaService,
    shareServiceProvider
]

export * from './shared';

export {
    Org,
    House,
    Center,
    Meta,
    adminServiceProvider
}