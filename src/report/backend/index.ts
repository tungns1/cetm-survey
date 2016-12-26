import { RefreshHistory } from './history.service';
import { RefreshAggregate } from './aggregate.service';
import { GetFilter, IFilter } from '../filter/';

let activeRes = function (filter: IFilter) {

}

export function SetRefresh(func: (filter: IFilter) => void) {
    activeRes = func
    Refresh(GetFilter())
}

export function Refresh(filter: IFilter) {
    activeRes(filter)
}

export { RefreshAggregate } from './aggregate.service';