export interface ICampaign {
    id?: string;
    name: string;
    channels: string[];
    surveys: string[];
    devices: string[];
    start: number;
    end: number;
}