
import * as Config from './config';
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';

import { CrudApiService, FilterService } from './shared';

const adminServiceProvider = [
    Org.OrgService,
    Config.ConfigApi,
    Center.CenterService,
    House.HouseService,
    FilterService
]

export * from './shared';

export {
    Org,
    Config,
    House,
    Center,
    adminServiceProvider
}