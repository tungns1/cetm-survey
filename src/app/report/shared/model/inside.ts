import { IService, ICounter, IUser} from '../../shared/model';

export interface IInsideBranch {
    services?: IService[];
    counters?: ICounter[];
    users?: IUser[];
}