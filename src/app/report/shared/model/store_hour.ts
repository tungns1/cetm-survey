import { CacheBranch } from '../../shared';
import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ICounterTrack } from './counter';
export interface IStoreHour {
    id?: string;
    branch_id: string;
    date: string;
    hour:string;
    t_ticket: number;
    m_ticket:number;
    st_waiting:number;
    ex_waiting:number;
    attended: number;
    discarded:number;
    l120m20:number;
    l20m0:number;
    avg_waiting: number;
    sum_waiting:number;
    avg_serving:number;
    sum_serving:number;
    wai_called:number;
    ser_called:number;
    teap: number;
    dap: number;
}
export interface ISH {
    id?: string;
    branch_id: string;
    date: string;
    week?: string;
    month?: string;
    year?: string;
    hour:string;
    t_ticket: number;
    m_ticket:number;
    st_waiting:number;
    ex_waiting:number;
    attended: number;
    discarded:number;
    l120m20:number;
    l20m0:number;
    avg_waiting: string;
    sum_waiting:string;
    avg_serving:string;
    sum_serving:string;
    wai_called:number;
    ser_called:number;
    teap: number;
    dap: number;
}


export class InfoStoreByHour {

    data: ISH[] = [];

    Add(s: IStoreHour[]) {
      for (var i = 0; i < s.length; i++) {
            var a_d = 0
            var store: ISH = {
                branch_id: s[i].branch_id,
                date: s[i].date,
                hour: this.Hour(s[i].hour),
                t_ticket: s[i].t_ticket,
                m_ticket: s[i].m_ticket,
                st_waiting:s[i].st_waiting,
                ex_waiting:s[i].ex_waiting,
                attended:s[i].attended,
                discarded:s[i].discarded,
                l120m20:s[i].l120m20,
                l20m0:s[i].l20m0,
                avg_waiting:this.SecondToHour(s[i].avg_waiting),
                sum_waiting:this.SecondToHour(s[i].sum_waiting),
                avg_serving:this.SecondToHour(s[i].avg_serving),
                sum_serving:this.SecondToHour(s[i].sum_serving),
                wai_called:s[i].wai_called,
                ser_called:s[i].ser_called,
                teap: s[i].teap * 100,
                dap: s[i].dap * 100,
            };
            
            store.teap = +(store.teap / store.m_ticket).toFixed(2);
            store.dap = +(store.dap / store.m_ticket).toFixed(2);
            this.data.push(store);

        }
    }
        SecondToHour(s: number) {
        if (s > 0) {
            return [s / 3600, (s % 3600) / 60, (s % 60)].map(this.TwoDigit).join(":");
        } else {
            return "00:00:00";
        }
    }
       TwoDigit(n: number): string {
        n = Math.floor(n);
        return (n > 9 ? '' : '0') + n;
    }

    Hour(s:string){
        var hour="";
        switch(s) {
            case "00":
                hour="00:00-01:00";
                break;
            case "01":
                hour="01:00-02:00";
                break;
            case "02":
                hour="02:00-03:00";
                break;
            case "03":
                hour="03:00-04:00";
                break;
            case "04":
                hour="04:00-05:00";
                break;
            case "05":
                hour="05:00-06:00";
                break;
            case "06":
                hour="06:00-07:00";
                break;
            case "07":
                hour="07:00-08:00";
                break;
            case "08":
                hour="08:00-09:00";
                break;
            case "09":
                hour="09:00-10:00";
                break;
            case "10":
                hour="10:00-11:00";
                break;
            case "11":
                hour="11:00-12:00";
                break;
            case "12":
                hour="12:00-13:00";
                break;
            case "13":
                hour="13:00-14:00";
                break;
            case "14":
                hour="14:00-15:00";
                break;
            case "15":
                hour="15:00-16:00";
                break;
            case "16":
                hour="16:00-17:00";
                break;
            case "17":
                hour="17:00-18:00";
                break;
            case "18":
                hour="18:00-19:00";
                break;
            case "19":
                hour="19:00-20:00";
                break;
            case "20":
                hour="20:00-21:00";
                break;
            case "21":
                hour="21:00-22:00";
                break;
            case "22":
                hour="22:00-23:00";
                break;
            case "23":
                hour="23:00-24:00";
                break;
            default:
                hour=""
        }
        return hour;

    }
    // SecondToHour(s: number) {
    //     return +(s / 3600).toFixed(2);
    // }



    static Make(records: IStoreHour[]) {
        let res = new InfoStoreByHour();
        if (records != null) {
            res.Add(records);
        }
        return res;
    }

}


