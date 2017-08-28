
import { ID, MemCache } from '../../shared/';

export interface IUser extends ID {
    branch_id: string;
    mtime?: number;
    username: string;
    fullname: string;
    dtime?: number;
    email?: string;
    role: string;
    password: string;
    external_id?: string;
    settings?: Object;

    _checked?: boolean;
    branch?: string;
}


export interface IRole {
    code: string;
    name: string;
}

export const USER_ROLES = {
    ADMIN: 'admin',
    STAFF: 'staff',
    MANAGER: 'manager',
    MEDIA: 'media',
    ADMIN_STANDARD: 'admin standard'
}

export const AllRoles: IRole[] = Object.keys(USER_ROLES).map(role => {
    const code: string = USER_ROLES[role];
    return <IRole>{
        code: code,
        name: code.toUpperCase()
    }
})

export const CacheUsers = new MemCache<IUser>();
