import { CacheBranch } from '../../shared';
import { ITransaction } from '../../model';


export { ITransaction } from '../../model';

export interface ITransactionView extends ITransaction {
    branch: string;
    parent: string;
    v_cdate: string;
    v_ctime: string;
    v_wtime: string;
    v_stime: string;
    v_fc_at: string;
    v_se_at: string;
    v_fi_at: string;
    v_state: string;
    audio: string;
}
