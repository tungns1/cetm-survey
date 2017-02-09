import { Model } from '../shared';

export interface IFocus {
    services?: Model.Center.IService[];
    counters?: Model.House.ICounter[];
    users?: Model.IUser[];
}