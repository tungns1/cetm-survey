import { IService, ICounter, IUser} from '../shared';

export interface IInsideBranch {
    services?: IService[];
    counters?: ICounter[];
    users?: IUser[];
}