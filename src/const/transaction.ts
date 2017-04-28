// Language default is based by partner
import { merge } from "lodash";
declare var CETM;

var Transaction = {
    serving_time: '2',
    attended: false,
}

var Config = {
    TimeTransaction: Transaction
}


const Configs = merge(Config, window['CETM']) || Config;

export const TRANSACTION= {
    SERVING_TIME: Configs.TimeTransaction.serving_time,
    ATTENDED: Configs.TimeTransaction.attended,
}



