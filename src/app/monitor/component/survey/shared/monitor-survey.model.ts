import { DatePipe } from '@angular/common';
import { INameValue } from '../../../../report/shared';
import { TranslateService } from '../../../../shared/util';

export interface IFeedbackDetail {
    content: string;
    answer: string;
    point: number | string;
    max_point: number;
    type: string;
}

export interface ISurveyDetail {
    survey_id: string;
    survey_name: string;
    point: number;
    max_point: number;
    feedback_detail: IFeedbackDetail[];
}

export interface IFeedbackReport {
    id: string;
    created_at: number;
    updated_at: number;
    uname: string;
    device: string;
    store: string;
    counter: string;
    campaign: string;
    campaign_id: string;
    question: string;
    survey_detail: ISurveyDetail[];
    point: number;
    max_point: number;
    average_point: number;
    day_ctime: string;
    location: string;
    hour_ctime: string;
    ctime: string;
    channel: string;
    finished: boolean;
    time?: string;
    date?: string;
}

export interface IStoreReport {
    actor: string;
    average_point: number;
    high: number;
    credit: number;
    medium: number;
    low: number;
    count: number;
    feedback_count?: number;
    finished: number;
    unfinished: number;
}

export interface IStaffReport {
    store: string;
    actor: string;
    average_point: number;
    high: number;
    credit: number;
    medium: number;
    low: number;
    count: number;
    finished: number;
    unfinished: number;
}

export interface IMonitorSurvey {
    poor_feedback_report: IFeedbackReport[];
    inpoor_feedback_report: IFeedbackReport[];
    staff_report: IStaffReport[];
    store_report: IStoreReport[];
}

export class MonitorSurVeyModel {

    private poorFeedback: IFeedbackReport[] = [];
    private otherFeedback: IFeedbackReport[] = [];
    private storeReport: IStoreReport[] = [];
    private staffReport: IStaffReport[] = [];
    protected translateService = new TranslateService;
    private feedbackConfig;

    UpdateData(data: IMonitorSurvey) {
        if (data) {
            data.poor_feedback_report = data.poor_feedback_report || [];
            data.store_report = data.store_report || [];
            data.staff_report = data.staff_report || [];

            this.getStoreReportData(data.store_report);
            this.staffReport = data.staff_report.sort((a, b) => {
                if (a.average_point == b.average_point) return 0;
                return a.average_point > b.average_point ? -1 : 1;
            });
            this.getPoorFeedback(data.poor_feedback_report);
            this.getOtherFeedback(data.inpoor_feedback_report);
        }
    }

    private getStoreReportData(data: IStoreReport[]) {
        this.storeReport = data.map(data => {
            data.feedback_count = data.finished + data.unfinished;
            data.average_point = Number.parseFloat(data.average_point.toFixed(2));
            return data;
        });
    }

    private getPoorFeedback(data: IFeedbackReport[]) {
        this.poorFeedback = data.map(feedback => {
            feedback.time = new DatePipe('en').transform(feedback.created_at, 'shortTime');
            feedback.date = new DatePipe('en').transform(feedback.created_at, 'shortDate');
            feedback.average_point = Number.parseFloat(feedback.average_point.toFixed(2));
            return feedback;
        }).sort((a, b) => {
            return (a.updated_at === b.updated_at) ? 0 : (a.updated_at > b.updated_at) ? -1 : 1;
        });
    }

    private getOtherFeedback(data: IFeedbackReport[]) {
        this.otherFeedback = data.map(feedback => {
            feedback.time = new DatePipe('en').transform(feedback.created_at, 'shortTime');
            feedback.date = new DatePipe('en').transform(feedback.created_at, 'shortDate');
            feedback.average_point = Number.parseFloat(feedback.average_point.toFixed(2));
            return feedback;
        }).sort((a, b) => {
            return (a.updated_at === b.updated_at) ? 0 : (a.updated_at > b.updated_at) ? -1 : 1;
        });
    }

    set FeedbackConfig(config) {
        this.feedbackConfig = config;
    }

    get StoreReport() {
        return this.storeReport;
    }

    get PoorFeedback() {
        return Array.from(this.poorFeedback);
    }

    get OtherFeedback() {
        return Array.from(this.otherFeedback);
    }

    get StaffReport() {
        return this.staffReport;
    }

    getChartDataByStore(storeName: string[]): INameValue[] {
        if (!storeName.length || !this.storeReport.length) return [];
        let storeSum: IStoreReport;
        let rawData = JSON.parse(JSON.stringify(this.storeReport.filter(store => {
            return storeName.find(name => name === store.actor);
        })));
        if (rawData.length) {
            let result: INameValue[] = [];
            storeSum = rawData.reduce((a, b) => {
                a.high += b.high;
                a.credit += b.credit;
                a.medium += b.medium;
                a.low += b.low;
                return a;
            });
            let raitingLv = {};
            raitingLv[this.translateService.translate('Good')] = storeSum.high;
            raitingLv[this.translateService.translate('Rather')] = storeSum.credit;
            raitingLv[this.translateService.translate('Average')] = storeSum.medium;
            raitingLv[this.translateService.translate('Poor')] = storeSum.low;
            Object.keys(raitingLv).forEach(key => {
                result.push({ name: key, value: raitingLv[key] })
            })
            return result;
        } else return []
    }

    getChartDataByChannel(channels: string[]): INameValue[] {
        if (!channels.length || (!this.poorFeedback.length && !this.otherFeedback.length)) return [];
        let rawData = JSON.parse(JSON.stringify(this.poorFeedback.concat(this.otherFeedback).filter(store => {
            return channels.find(name => name === store.channel);
        })));
        if (rawData.length) {
            let result: INameValue[] = [];
            let raitingLv = {};
            raitingLv[this.translateService.translate('Good')] = rawData.filter(record => record.average_point >= this.feedbackConfig.high_rate).length;
            raitingLv[this.translateService.translate('Rather')] = rawData
                .filter(record => (record.average_point < this.feedbackConfig.high_rate && record.average_point >= this.feedbackConfig.credit_rate)).length;
            raitingLv[this.translateService.translate('Average')] = rawData
                .filter(record => (record.average_point < this.feedbackConfig.credit_rate && record.average_point >= this.feedbackConfig.medium_rate)).length;
            raitingLv[this.translateService.translate('Poor')] = rawData.filter(record => record.average_point < this.feedbackConfig.medium_rate).length;
            Object.keys(raitingLv).forEach(key => {
                result.push({ name: key, value: raitingLv[key] })
            })
            return result;
        } else return []
    }

    getFeedbackRatioChart(storeName: string[]): INameValue[] {
        if (!storeName.length || !this.storeReport.length) return [];
        const storeList: IStoreReport[] = this.storeReport.filter(store => storeName.find(_storeName => _storeName === store.actor));
        let storeSum: IStoreReport;
        let result: INameValue[] = [];
        storeSum = JSON.parse(JSON.stringify(storeList)).reduce((a: IStoreReport, b: IStoreReport) => {
            a.finished += b.finished;
            a.unfinished += b.unfinished;
            return a;
        });
        result.push(
            { name: this.translateService.translate('Finished'), value: storeSum.finished },
            { name: this.translateService.translate('Unfinished'), value: storeSum.unfinished }
        );
        return result;
    }

    getFeedbackCountByStaffChart(storeName: string): INameValue[] {
        let result: INameValue[] = [];
        this.staffReport.forEach(el => {
            if (el.store === storeName) {
                result.push({
                    name: el.actor,
                    value: el.count
                })
            }
        })
        return result.sort((a, b) => b.value - a.value);
    }

    getFeedbackAverageByStaffChart(storeName: string): INameValue[] {
        let result: INameValue[] = [];
        this.staffReport.forEach(el => {
            if (el.store === storeName) {
                result.push({
                    name: el.actor,
                    value: el.average_point
                })
            }
        })
        return result.sort((a, b) => b.value - a.value);
    }
}