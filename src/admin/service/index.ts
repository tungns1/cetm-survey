
import * as Config from './config';
import * as House from './house';
import * as Center from './center/';
import * as Org from './org';

const adminServiceProvider = [
    Org.orgServiceProvider,
    Config.ConfigApi,
    Center.CenterProvider,
    House.houseServiceProvider
]

export {
    Org,
    Config,
    House,
    Center,
    adminServiceProvider,
}