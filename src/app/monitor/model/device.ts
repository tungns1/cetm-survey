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
export interface ICountState {
    branch_id: string;
    device_type: string;
    on: number;
    off: number;
}

export interface ISumaryDevice {
    branch_id: string;
    counter_count: ICountState;
    kiosk_count: ICountState;
}


import { CacheBranch } from '../shared';

export class DeviceCount {
    constructor(data?: ISumaryDevice) {
        data = data || <any>{};
        this.branch_id = data.branch_id;
        this.kiosk_on = data.kiosk_count.on;
        this.kiosk_off = data.kiosk_count.off;
        this.counter_on = data.kiosk_count.on;
        this.counter_off = data.kiosk_count.off;

        const branch = CacheBranch.GetByID(this.branch_id);

    }
    get total_counter() {
        return this.counter_on + this.counter_off;
    }
    get total_kiosk() {
        return this.kiosk_on + this.kiosk_off;
    }

    branch_id: string;
    device_type: string;
    counter_on: number;
    counter_off: number;
    kiosk_on: number;
    kiosk_off: number



}
