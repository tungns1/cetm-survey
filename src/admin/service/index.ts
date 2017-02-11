
import * as Config from './config';
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';

import {AdminFilterService} from './filter.service';
const adminServiceProvider = [
    Org.orgServiceProvider,
    Config.ConfigApi,
    Center.CenterProvider,
    House.houseServiceProvider,
    AdminFilterService
]

export {
    Org,
    Config,
    House,
    Center,
    adminServiceProvider,
    AdminFilterService
}