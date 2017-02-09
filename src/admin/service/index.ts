
import * as Config from './config';
import * as User from './user';
import * as House from './house';
import * as Center from './center/';

const adminServiceProvider = [
    Config.ConfigApi,
    User.UserApi,
    Center.CenterProvider,
    House.houseServiceProvider
]

export {
    adminServiceProvider,
    Config,
    User,
    House,
    Center,
}