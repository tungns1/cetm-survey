import { IService } from '../center/';

export interface IKiosk {
    id?: string;
    branch_id: string;
    code: string;
    name: string;
    vcodes: string;
    services: IService[];
    layout_id: string;
    tlayout_id: string;
    inheritable: boolean;
    parent_id: string;
    layout_resources: any;
    is_group: boolean;
}