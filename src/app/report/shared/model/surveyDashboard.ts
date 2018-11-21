interface IRespone {
    status: string;
}

export interface IGeneralRespone extends IRespone {
    data: IGeneralData[]
}

export interface IGeneralData {
    channel?: string;
    actor?: string;
    store?: string;
    average_point: number;
    high: number;
    credit: number;
    medium: number;
    low: number;
    count: number;
    high_percent?: string;
    credit_percent?: string;
    medium_percent?: string;
    low_percent?: string;
}

export class SurveyGeneral {

    constructor() { }

    private data: IGeneralData[];

    Update(data: IGeneralData[]) {
        if (data) {
            this.data = JSON.parse(JSON.stringify(data));
            this.data.forEach(_data => {
                _data.average_point = Number.parseFloat(_data.average_point.toFixed(2));
                _data.high_percent = Number.parseFloat((_data.high * 100 / _data.count).toString()).toFixed(2);
                _data.credit_percent = Number.parseFloat((_data.credit * 100 / _data.count).toString()).toFixed(2);
                _data.medium_percent = Number.parseFloat((_data.medium * 100 / _data.count).toString()).toFixed(2);
                _data.low_percent = Number.parseFloat((_data.low * 100 / _data.count).toString()).toFixed(2);
                return _data;
            })
        }
    }

    GetSumDataByChannel(channels: string[]) {
        if (channels.length && this.data) {
            let result: IGeneralData;
            let tempData = this.data.filter(record => {
                return channels.find(channel => channel === record.channel)
            })
            if(tempData.length > 0){
                result = tempData.reduce((a, b) => {
                    return {
                        count: a.count + b.count,
                        average_point: a.average_point / this.data.length + b.average_point / this.data.length,
                        high: a.high + b.high,
                        credit: a.credit + b.credit,
                        medium: a.medium + b.medium,
                        low: a.low + b.low
                    }
                })
                result.high_percent = Number.parseFloat((result.high * 100 / result.count).toString()).toFixed(2);
                result.credit_percent = Number.parseFloat((result.credit * 100 / result.count).toString()).toFixed(2);
                result.medium_percent = Number.parseFloat((result.medium * 100 / result.count).toString()).toFixed(2);
                result.low_percent = Number.parseFloat((result.low * 100 / result.count).toString()).toFixed(2);
            }
            return result;
        }
    }

    GetSumDataByStore(
        actor: 'uname' | 'device' | 'store',
        store: string[],
        devices: string[],
        users: string[]
    ) {
        if (store.length && this.data) {
            let _result: IGeneralData[] = this.data.filter(record => {
                if (actor === 'store') {
                    return store.find(actor => actor === record.store)
                }
                if (actor === 'device') {
                    return devices.find(device => device === record.actor)
                }
                return users.find(actor => actor === record.actor)
            })
            if (_result.length) {
                let result = _result.reduce((a, b) => {
                    return {
                        count: a.count + b.count,
                        average_point: a.average_point / this.data.length + b.average_point / this.data.length,
                        high: a.high + b.high,
                        credit: a.credit + b.credit,
                        medium: a.medium + b.medium,
                        low: a.low + b.low
                    }
                })
                result.high_percent = Number.parseFloat((result.high * 100 / result.count).toString()).toFixed(2);
                result.credit_percent = Number.parseFloat((result.credit * 100 / result.count).toString()).toFixed(2);
                result.medium_percent = Number.parseFloat((result.medium * 100 / result.count).toString()).toFixed(2);
                result.low_percent = Number.parseFloat((result.low * 100 / result.count).toString()).toFixed(2);
                return result;
            } else return null;
        }
    }

    get Data() {
        return this.data;
    }

    get MultiChannelChart() {
        let byFeedbackCount = this.data.map(_data => {
            return { name: _data.channel, value: _data.count }
        })
        let byAverageFeedback = this.data.map(_data => {
            return { name: _data.channel, value: _data.average_point }
        })
        return { byFeedbackCount: byFeedbackCount, byAverageFeedback: byAverageFeedback }
    }

    get StoreChart() {
        let byFeedbackCount = this.data.map(_data => {
            return { name: _data.actor, value: _data.count }
        })
        let byAverageFeedback = this.data.map(_data => {
            return { name: _data.actor, value: _data.average_point }
        })
        return { byFeedbackCount: byFeedbackCount, byAverageFeedback: byAverageFeedback }
    }

}

/*******************************************************************/

export interface IFeedbackCountChart {
    day: string;
    count: number;
    store: number;
    sms: number;
    call_center: number;
    website: number;
}

export interface IFeedbackCountChartRespone {
    data: IFeedbackCountChart[];
    status: string;
}

export interface INameValue {
    name: string;
    value: number;
}

export interface IChartMulti {
    name: string;
    series: INameValue[];
}


export class GeneralChart {
    constructor() { }

    feedbackCountChart: IChartMulti[] = [];

    UpdateFeedbackCount(data: IFeedbackCountChart[]) {
        let result: IChartMulti[] = [];
        if (data.length) {
            Object.keys(data[0]).filter(k => k !== 'day').forEach((key, index) => {
                result[index] = { name: '', series: [] };
                result[index].name = key;
                data.forEach(_d => result[index].series.push({ name: _d.day, value: _d[key] }))
            })
        }
        this.feedbackCountChart = result;
    }

}

//////////////////////////////////

export interface IFeedbackDetail {
    content: string;
    answer: string;
    point: number | string;
    max_point: number;
    type: 'answer' | 'single' | 'multiple'
}

export interface ISurveyDetail {
    survey_id: string;
    survey_name: string;
    feedback_detail: IFeedbackDetail[];
}

export interface IHistoryData {
    id: string;
    created_at: number;
    updated_at: number;
    uname: string;
    device: string;
    store: string;
    channel: string;
    counter: string;
    campaign: string;
    campaign_id: string;
    question: string;
    survey_detail: ISurveyDetail[];
    location: string;
    point: number;
    max_point: number;
    average_point: number;
    day_ctime: string;
    hour_ctime: string;
    serve_at?: number;
    service_name?: string;
    car_id?: string;
}

export interface IHistoryRespone extends IRespone {
    data: IHistoryData[];
}

export interface ICampaignListData {
    campaign_name: string,
    count: number,
    average_point: number,
    duration: string,
    channels: string[],
    surveys: {
        id: string,
        name: string
    }[]
}

export interface ICampaignListRespone extends IRespone {
    data: ICampaignListData[];
}

export interface IAnalysisData {
    day: string,
    quantity: number
}

export interface IAnalysisRespone extends IRespone {
    data: IAnalysisData[];
}