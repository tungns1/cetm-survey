
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';
import { MetaService } from './meta';

import { CrudApiService, FilterService } from './shared';

const adminServiceProvider = [
    Org.OrgService,
    Center.CenterService,
    House.HouseService,
    MetaService,
    FilterService
]

export * from './shared';

export {
    Org,
    House,
    Center,
    MetaService,
    adminServiceProvider
}