export interface IDevice {
    id?: string;
    name: string;
    branch_id: string;
    device_id: string;
    device_type: string;
    state: string;
    data: Object;
    mtime: number;
}
export interface IDevices {
    [index: string]: IDevice;
}



