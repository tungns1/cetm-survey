// Language default is based by partner
import { merge } from "lodash";
declare var CETM;

var Config = {
    TimeService: Service
}

const Configs = merge(Config, window['CETM']);

export const LOCALES_SERVICE= {
    MAX_SERVING: Configs.TimeService.max_serving,
    MAX_WAITING: Configs.TimeService.max_waiting,
    AUTO_FINISH: Configs.TimeService.auto_finish,
}


var Service = {
    max_serving: '10',
    max_waiting: '10',
    auto_finish: '10',
}
