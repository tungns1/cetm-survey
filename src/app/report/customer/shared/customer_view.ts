import { CacheBranch, ITransaction, ProjectConfig } from '../../shared';
import { ServiceName } from '../../../shared/model/center';
export interface ICustomerView {
    fres: IValue[],
    service: IValue[],
    store: IValue[],
    time: ITime,
}

export interface IValue {
    name: string;
    value: number;
}
export interface ITime {
    c_bwt: number;
    c_bst: number;
    s_wt: number;
    s_st: number;
}


export class CustomerView {
    customer_id: string;
    services: IValue[] = [];
    stores: IValue[] = [];
    fres: IValue[] = [];
    times: ITime = null;
    freschart = [
        {
            "name": "Frequency",
            "series": [
            ]
        }
    ];

    c_t = 0; // count transaction
    c_bwt = 0; // count bellow waiting time
    c_bst = 0; // count bellow serving time
    s_wt = 0; // sum waiting time
    s_st = 0; // sum serving time



    Add(s: ICustomerView) {
        if (s != null) {
            s.service.forEach(v => {
                var a = {
                    name: ServiceName(v.name),
                    value: v.value
                }
                this.services.push(a);
            })
            s.store.forEach(v => {
                var a = {
                    name:CacheBranch.GetNameForID(v.name),
                    value: v.value
                }
                this.stores.push(a);
            })
             s.fres.forEach(v => {
                var a = {
                    name:this.Format(v.name),
                    value: v.value
                }
                this.fres.push(a);
            })
            this.c_bwt = s.time.c_bwt;
            this.c_bst = s.time.c_bst;
            this.s_st = s.time.s_st;
            this.s_wt = s.time.s_wt;
            this.c_t = s.time.c_bst + s.time.s_st;
        }
    }
    Format(month :string){
      if(+month<10){
          return "0"+month;
      }
      return month;
    }


    Finalize() {
        var fres = this.freschart;
        this.freschart[0].series = this.fres;
        this.c_awt = this.c_t - this.c_bwt;
        this.s_tt = this.s_wt + this.s_st;
        // percent
        if (this. c_t > 0) {
            this.c_awt_p = this.c_awt * 100 / this.c_t;
            this.s_wt_p = this.s_wt * 100 / this.c_t;
            this.c_bwt_p = this.c_bwt * 100 / this.c_t;
            this.s_st_p = this.s_st * 100 / this.c_t;
            this.c_bst_p = this.c_bst * 100 / this.c_t;
        }
    }

    // count 
    c_bst_p = 0;
    s_st_p = 0;
    s_wt_p = 0;
    c_bwt_p = 0;
    c_awt = 0; c_awt_p = 0;
    s_tt = 0;


    static Make(records: ICustomerView) {

        let res = new CustomerView();

        res.Add(records);


        res.Finalize();
        return res;
    }

}

