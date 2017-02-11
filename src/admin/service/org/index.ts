export * from './branch';
export * from './user';
import { UserApi } from './user';

export const orgServiceProvider = [
    UserApi
]
