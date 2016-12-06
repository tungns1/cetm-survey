import { ITransaction, IHistory } from './transaction.model';
import { Backend, Branch } from '../shared/';
const backendReport = new Backend.HttpApi<any>("/api/report/transaction");
import { IFilter } from '../filter/filter.module';

interface ITransactionView extends ITransaction {
    v_branch_0: string;
    v_branch_1: string;
    v_branch_2: string;

    v_cdate: string;
    v_ctime: string;

    v_wtime: string;
    v_stime: string;
    v_fc_at: string;
    v_se_at: string;
    v_fi_at: string;
    v_state: string;
}


function TwoDigit(n: number): string {
    n = Math.round(n);
    return (n > 9 ? '' : '0') + n;
}

function Duration(t: number): string {
    return [t / 3600, (t % 3600) / 60, t % 60].map(TwoDigit).join(":");
}

function Hour(v: Date): string {
    return [v.getHours(), v.getMinutes(), v.getSeconds()].map(TwoDigit).join(":");
}


const Branches = Branch.Branches;

function formatTransaction(t: ITransaction) {
    var res = <ITransactionView>t;

    // time
    var d = new Date(t.ctime);
    res.v_cdate = t.cdate;
    res.v_ctime = t.ctime;
    res.v_fc_at = t.fc_at;
    res.v_se_at = t.se_at;
    res.v_fi_at = t.fi_at;
    res.v_wtime = t.wtime;
    res.v_stime = t.stime;


    // name
    const branch_0 = Branches.get(t.branch_id) || { name: "n/a" };
    res.v_branch_0 = branch_0.name || "n/a";
    const branch_1 = Branches.get(branch_0.parent) || { name: 'n/a' };
    res.v_branch_1 = branch_1.name || "n/a";
    const branch_2 = Branches.get(branch_1.parent) || { name: "n/a" };
    res.v_branch_2 = branch_2.name || "n/a";
    return res;
}


import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxCount = new BehaviorSubject<number>(0);
export const RxHistory = new BehaviorSubject<ITransactionView[]>([]);
export function RefreshHistory(filter: IFilter) {
    let res = backendReport.Get<IHistory>("read", filter).do(v => {
        console.log(v);
        RxHistory.next(v.data.map(formatTransaction));
        RxCount.next(v.total);
    });
    res.subscribe();
}

