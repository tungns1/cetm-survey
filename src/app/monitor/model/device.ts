export interface IDevice {
    id?: string;
    name: string;
    branch_id: string;
    device_id: string;
    device_type: string;
    state: string;
    data: Object;
    on_at: number;
    off_at: number;
    total_on: number
    date: string;
}

export interface IDevices {
    counter: IDevice[];
    kiosk: IDevice[];
}

export interface IDeviceSummary {
    branch_id: string;
    device_type: string;
    state: string;
    on_at: number;
    off_at: number;
    date: string;
}



import { CacheBranch } from '../shared';

export class SummaryDevice {

    id?: string;
    name: string;
    branch_id: string;
    device_id: string;
    device_type: string;
    state: string;
    data: Object;
    on_at: number;
    off_at: number;
    total_on: number
    date: string;
    static Make(s: IDevices) {

    }
}
