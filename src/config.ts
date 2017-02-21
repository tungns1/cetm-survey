export interface IAppConfig { }

export interface IFeedbackConfig {
    has_device: boolean
    required: boolean
    remind_timeout: number
}

export interface IKioskConfig { }

export interface ILedConfig {
    show_error_on_counter: boolean
}

export interface IMonitorConfig { }

export interface IReportConfig { }

export interface ScreenConfig { }

export interface ISystemConfig { }

export interface ICounterConfig {
    max_concurrent_serving: number
    min_call_before_miss: number
    auto_finish_wait_minute: number
    auto_finish_retry_minute: number
}

export interface IServiceConfig  {
	max_waiting_minute:number
	max_serving_minute:number
}

export interface IL10nConfig {
    locale: string
    locales: string[]
}

export interface IConfig {
    branch_id: string
    service: IServiceConfig
    counter: ICounterConfig
    l10nn: IL10nConfig
    feedback: IFeedbackConfig
    led: ILedConfig
}

var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}
var client = new HttpClient();
var branch_id = '';
client.get('http:3000//api/config?branch_id=branch_id', function (response){

});