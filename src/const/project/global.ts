
interface IGeneralConfig {
    default_language?: string;
    supported_languages?: string[];
}

class GeneralConfig {
    constructor(private _c: IGeneralConfig = {}) { }
    default_language = this._c.default_language || 'en';
    supported_languages = this._c.supported_languages || ["en"];
    default_culture = this.default_language;
    supported_cultures = this.supported_languages;
}

interface IServiceConfig {
    max_serving_minute?: string;
    max_waitng_minute?: string;
    auto_finish_minute?: string;
}

class ServiceConfig {
    constructor(private _c: IServiceConfig = {}) { }
    max_serving_minute = +this._c.max_serving_minute || 15;
    max_waiting_minute = +this._c.max_waitng_minute || 15;
    auto_finish_minute = +this._c.auto_finish_minute || 120;
}

interface IPriorityConfig {
    internal_vip_card?: number; // vip card
    customer_vip_card?: number; // vip customer
    privileged_customer?: number; // privileged 
    moved_ticket?: number;
    booked_ticket?: number; // booked
    min_priority_restrited?: number;
    min_priority_unordered_call?: number;
}

class PriorityConfig {
    constructor(private _c: IPriorityConfig = {}) { }
    internal_vip_card = +this._c.internal_vip_card || 1;
    customer_vip_card = +this._c.customer_vip_card || 1;
    privileged_customer = +this._c.privileged_customer || 1;
    booked_ticket = +this._c.booked_ticket || 1;
    moved_ticket = +this._c.moved_ticket || 1;
    min_priority_unordered_call = +this._c.min_priority_unordered_call || 1;
    min_priority_restrited = +this._c.min_priority_restrited || 2 ^ 16; // disable
}

interface IGlobalConfig {
    general?: IGeneralConfig;
    priority?: IPriorityConfig;
    service?: IServiceConfig;
}

export class GlobalConfig {
    constructor(private _c: IGlobalConfig = {}) {};
    general = new GeneralConfig(this._c.general);
    priority = new PriorityConfig(this._c.priority);
    service = new ServiceConfig(this._c.service);
}