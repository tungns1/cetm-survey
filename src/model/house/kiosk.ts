export interface IKiosk {
    id?: string;
    branch_id: string;
    code: string;
    name: string;
    vcodes: string;
    services: Object;
    layout_id: string;
    inheritable: boolean;
    parent_id: string;
}