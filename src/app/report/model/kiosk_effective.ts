export interface IKioskEff {
    branch_id: string;
    kiosk_id: string;
    total_on_time: number;
}


export interface IInfoKioskEff{
    total_kiosk:number;
    longest_activity_kiosk:string;
    shortest_activity_kiosk:string;
    average_kiosk_eff:number;
    total_activity:number;
    longest_activity_time:number;
    shortest_activity_time:number;
    average_activity_time:number;
}