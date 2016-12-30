export interface IUser {
    id?: string;
    branch_id?: string;
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

export const AllRoles: IRole[] = [
    { code: 'admin', name: 'Admin' },
    { code: 'staff', name: 'Staff' },
    { code: 'manager', name: 'Manager' },
    { code: 'media', name: 'Media' }
]


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
