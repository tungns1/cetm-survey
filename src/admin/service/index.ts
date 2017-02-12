
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';
import * as Meta from './meta';

import { CrudApiService, AdminFilterService } from './shared';

const adminServiceProvider = [
    Org.OrgService,
    Center.CenterService,
    House.HouseService,
    Meta.MetaService,
    AdminFilterService
]

export * from './shared';

export {
    Org,
    House,
    Center,
    Meta,
    adminServiceProvider
}