interface IServiceConfig {
    max_waiting_minute: number;
    max_serving_minute: number;
}

interface IFeedbackConfig {
    has_device: boolean;
    required: boolean;
    remind_timeout: number;
}

interface IKioskConfig {

}

interface ILedConfig {
    show_error_on_counter: boolean;
}

interface IMonitorConfig {

}

interface IReportConfig {

}

interface IScreenConfig {

}

interface ISystemConfig {

}

interface ICounterConfig {
    max_concurrent_serving: number;
    min_call_before_miss: number;
    auto_finish_wait_minute: number;
    auto_finish_retry_minute: number;
}

interface IL10nConfig {
    locale: string;
    locales: string[];
}

export interface IBranchConfig {
    id: string;
    branch_id: string;
    service: IServiceConfig;
    feedback: IFeedbackConfig;
    counter: ICounterConfig;
    l10n: IL10nConfig;
}
