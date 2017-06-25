import { IPriorityConfig } from '../../../../const/project/priority';

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

export interface IBranchConfig {
    id: string;
    branch_id: string;
    service: IServiceConfig;
    feedback: IFeedbackConfig;
    priority: IPriorityConfig;
}
