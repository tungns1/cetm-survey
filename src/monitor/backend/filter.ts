import { IAsideFilter, ITab } from '../shared/';

let Tag: string = '';
let BranchID: string = ''; 

export function SetTab(tab: ITab) {
    Tag = tab.tag;
}

export function SetAsideFilter(filter: IAsideFilter) {
    BranchID = filter.branch_id;
}

export function GetFilter() {
    return {
        tag: Tag,
        branch_id: BranchID
    }
}