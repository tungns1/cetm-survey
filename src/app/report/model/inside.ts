import { Model } from '../shared';

export interface IInsideBranch {
    services?: Model.Center.IService[];
    counters?: Model.House.ICounter[];
    users?: Model.Org.IUser[];
}