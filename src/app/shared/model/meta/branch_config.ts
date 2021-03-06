import { IPriorityConfig, ICounterConfig } from '../../../../const/project';

interface IServiceConfig {
    basket: string[];
    max_waiting_minute: number;
    max_serving_minute: number;
}

interface IFeedbackConfig {
    has_device: boolean;
    required: boolean;
    remind_timeout: number;
}

export interface IKioskConfig {
    max_ticket: number;
    time_work_in_day: {
        time_start: number;
        time_end: number;
    }[];
}

export interface IBranchConfig {
    id: string;
    branch_id: string;
    service: IServiceConfig;
    feedback: IFeedbackConfig;
    priority: IPriorityConfig;
    counter: ICounterConfig;
    kiosk: IKioskConfig;
}
